from flask import Flask, jsonify, request, abort
# from dotenv import load_dotenv
from Extensions import limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from Routes import register_routes
from datetime import datetime
import helper.Helper as DBHelper
# import helper.InitiateConnection as InitiateDB
import os
import mysql.connector
# import sqlite3

app = Flask(__name__)
CORS(app)

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

#add limiting for each user, not whole server...

def has_admin2():
    print('fix')
    # res = DBHelper.has_value2("UserAcct", "Username", "Admin")
    # if not res:
    #     h = DBHelper.encrypt_password("password")
    #     currDte = str(datetime.now())
    #     DBHelper.insert_value("UserAcct", 
    #                           ["Username","UserPassword", "FirstName","LastName","Email","CreatedDate",
    #                            "ConfirmedEmail","TwoFactor","AdminLevel","IsAdmin","IsDemo"],
    #                           ["Admin", h,"Jonathan","Dressel","jonathanedressel@gmail.com",currDte,
    #                            "false","false","Site","true","false"])

def has_admin():
    print('fix')
    # res = DBHelper.has_value("UserAcct", "Username", "Admin")
    # if not res:
    #     h = DBHelper.encrypt_password("password")
    #     currDte = str(datetime.now())
    #     DBHelper.insert_value("UserAcct", 
    #                           ["Username","UserPassword", "FirstName","LastName","Email","CreatedDate",
    #                            "ConfirmedEmail","TwoFactor","AdminLevel","IsAdmin","IsDemo"],
    #                           ["Admin", h,"Jonathan","Dressel","jonathanedressel@gmail.com",currDte,
    #                            "false","false","Site","true","false"])

def validate_db():
    # DBHelper.has_table("UserAcct",
    #     "(Id INTEGER PRIMARY KEY AUTOINCREMENT, " \
    #                 "Username TEXT UNIQUE, " \
    #                 "FirstName TEXT, " \
    #                 "LastName TEXT, " \
    #                 "UserPassword TEXT, " \
    #                 "Email TEXT UNIQUE, " \
    #                 "PhoneNumber TEXT UNIQUE, " \
    #                 "CreatedDate TEXT, " \
    #                 "ConfirmedEmail BOOLEAN DEFAULT False, " \
    #                 "TwoFactor BOOLEAN DEFAULT True, " \
    #                 "LastLogin TEXT, " \
    #                 "IsDemo BOOLEAN DEFAULT False, " \
    #                 "AdminLevel TEXT, " \
    #                 "IsAdmin BOOLEAN DEFAULT False)")
    has_admin()

# def run_db_checks():
#     validate_db()

@app.route('/')
def home():
    return "Home route"

limiter.init_app(app)

# register_routes(app)

if __name__ == '__main__':
    #  run_db_checks()
    # InitiateDB
    app.run(host='0.0.0.0', port=5000)