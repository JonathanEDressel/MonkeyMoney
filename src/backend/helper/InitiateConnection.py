import mysql.connector
import os

HOST_URL=os.getenv("HOST_URL")
MYSQL_USER=os.getenv("MYSQL_USER")
MYSQL_PASSWORD=os.getenv("MYSQL_PASSWORD")
MYSQL_PROGRAM_DB=os.getenv("MYSQL_PROGRAM_DB")

def connect_to_db():
    return mysql.connector.connect(
            host=HOST_URL,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_PROGRAM_DB
        )
