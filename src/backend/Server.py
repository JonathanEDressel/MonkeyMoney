# Example using Flask
from flask import Flask, jsonify, request, abort
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import helper.Helper as DBHelper
import sqlite3

app = Flask(__name__)

limiter = Limiter(
    get_remote_address,
    app=app,
    # default_limits["60 per minute"]
)

def has_admin():
    res = DBHelper.has_value("Users", "Username", "Admin")
    if not res:
        DBHelper.insert_value("Users", 
                              ["Username","Password","FirstName","LastName","Email","AdminLevel","IsAdmin","IsDemo"],
                              ["Admin","password123","Jonathan","Dressel","jonathanedressel","Site","true","false"])

def validate_db():
    DBHelper.has_table("Users",
        "(Id INTEGER PRIMARY KEY AUTOINCREMENT, " \
                    "Username TEXT UNIQUE, " \
                    "Password TEXT, " \
                    "FirstName TEXT, " \
                    "LastName TEXT, " \
                    "Email TEXT UNIQUE, " \
                    "PhoneNumber TEXT UNIQUE, " \
                    "LastLogin TEXT, " \
                    "IsDemo BOOLEAN, " \
                    "AdminLevel TEXT, " \
                    "IsAdmin BOOLEAN)")
    has_admin()

def run_db_checks():
    validate_db()

# def get_db_connection():
    # conn = sqlite3.connect("ProgramData.db")

@app.route('/about', methods=['GET'])
def about():
    return "Hello from the ABOUT page!"

@limiter.limit("20 per minute")
@app.route('/users/login', methods=['POST'])
def user_profile():
    req = request.json
    uname = req['username']
    if len(uname) > 0 and uname:
        res = DBHelper.has_value("Users", "Username", uname)
        print(res, uname)
        if not res:
            return jsonify({"message": "Invalid login credentials"}), 404
        
    return jsonify({"message": "Login successful"}), 200

@app.route('/')
def home():
    return "Hello from the HOME page!"

if __name__ == '__main__':
     run_db_checks()
     app.run(host='0.0.0.0', port=5000)