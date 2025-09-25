import mysql.connector
import os

HOST_URL=os.getenv("HOST_URL")
MYSQL_USER=os.getenv("MYSQL_USER")
MYSQL_PASSWORD=os.getenv("MYSQL_PASSWORD")
MYSQL_PROGRAM_DB=os.getenv("MYSQL_PROGRAM_DB")

print(HOST_URL)
print(MYSQL_USER)
print(MYSQL_PASSWORD)
print(MYSQL_USER)

programDB = mysql.connector.connect(
    host="localhost",
    user="sysadmin",
    password="brn4L4ugh5"
)

mycursor = programDB.cursor()

mycursor.execute("CREATE DATABASE mydatabase")