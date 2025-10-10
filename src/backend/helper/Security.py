from functools import wraps
from flask import jsonify, request
import jwt
import datetime
import os

SECRET_KEY=os.getenv("SECRET_KEY")
ALGO_TO_USE=os.getenv("ALGO_TO_USE", "HS256")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable is not set.")

def create_jwt(uuid, username):
    if not uuid or not username:
        return None
    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        "user_id": uuid,
        "username": username,
        "exp": now + datetime.timedelta(minutes=120),
        "iat":now
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGO_TO_USE)
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    if not token:
        return None
    return token

def requires_token(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGO_TO_USE])
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(decoded, *args, **kwargs)
    return decorator

# @app.route("/protected", methods=["GET"])
# @token_required
# def protected(decoded):
    # return jsonify({"message": f"Welcome {decoded['username']}!"})