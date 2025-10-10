import jwt
import datetime
import os

SECRET_KEY=os.getenv("SECRET_KEY")
ALGO_TO_USE=os.getenv("ALGO_TO_USE", "HS256")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable is not set.")

def create_jwt(uuid, username):
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

    return token