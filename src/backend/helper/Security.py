import uuid
import jwt
import datetime
import time
import os

SECRET_KEY=os.getenv("SECRET_KEY")
ALGO_TO_USE=os.getenv("ALGO_TO_USE")

def create_jwt(uuid, username):
    payload = {
        "user_id": uuid,
        "username": username,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=120),
        "iat": datetime.datetime.now(datetime.timezone.utc),
        
    }
    token = jwt.encode(payload, SECRET_KEY, ALGO_TO_USE)
    return token