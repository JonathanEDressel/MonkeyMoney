from flask import Flask, jsonify, request, abort
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from datetime import datetime
import helper.Helper as DBHelper
import sqlite3

app = Flask(__name__)

CORS(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["60 per minute"]
)

def has_admin():
    res = DBHelper.has_value("UserAcct", "Username", "Admin")
    if not res:
        h = DBHelper.encrypt_password("password")
        currDte = str(datetime.now())
        DBHelper.insert_value("UserAcct", 
                              ["Username","UserPassword", "FirstName","LastName","Email","CreatedDate",
                               "ConfirmedEmail","TwoFactor","AdminLevel","IsAdmin","IsDemo"],
                              ["Admin", h,"Jonathan","Dressel","jonathanedressel@gmail.com",currDte,
                               "false","false","Site","true","false"])

def validate_db():
    DBHelper.has_table("UserAcct",
        "(Id INTEGER PRIMARY KEY AUTOINCREMENT, " \
                    "Username TEXT UNIQUE, " \
                    "FirstName TEXT, " \
                    "LastName TEXT, " \
                    "UserPassword TEXT, " \
                    "Email TEXT UNIQUE, " \
                    "PhoneNumber TEXT UNIQUE, " \
                    "CreatedDate TEXT, " \
                    "ConfirmedEmail BOOLEAN DEFAULT False, " \
                    "TwoFactor BOOLEAN DEFAULT True, " \
                    "LastLogin TEXT, " \
                    "IsDemo BOOLEAN DEFAULT False, " \
                    "AdminLevel TEXT, " \
                    "IsAdmin BOOLEAN DEFAULT False)")
    has_admin()

def run_db_checks():
    validate_db()

@limiter.limit("20 per minute")
@app.route('/user/add', methods=['POST'])
def add_user():
    req = request.json
    print(req)
    username = req.get('email', '').strip()
    email = req.get('email', '').strip()
    password = DBHelper.encrypt_password(req.get('userpassword', '').strip())
    fname = req.get('firstname', '').strip()
    lname = req.get('lastname', '').strip()
    if DBHelper.has_email(email):
        return jsonify({"message": "Email is invalid", "status": 404}), 404
    if DBHelper.has_username(username):
        return jsonify({"message": "Username is invalid", "status": 404}), 404
    currDte = str(datetime.now())
    DBHelper.insert_value("UserAcct", 
                              ["Username","UserPassword", "FirstName","LastName","Email","CreatedDate"],
                              [username, password,fname,lname,email,currDte])
    return jsonify({"message": "User added", "status": 200}), 200

@limiter.limit("20 per minute")
@app.route('/login', methods=['POST'])
def user_profile():
    req = request.json
    username = req.get('username', '').strip()
    password = req.get('userpassword', '').strip()
    if not username or not password:
        return jsonify({"message": "Please enter a username and password", "status": 404}), 404
    
    conn = sqlite3.connect("ProgramData.db")
    cursor = conn.cursor()
    cursor.execute(f"SELECT UserPassword FROM UserAcct WHERE Username=? or Email=?", [username, username])
    usrrow = cursor.fetchone()
    conn.close()
    if not usrrow:
        return jsonify({"message": "Invalid login credentials", "status": 404}), 404
        
    usrPWHash = usrrow[0]
    if isinstance(usrPWHash, str):
        usrPWHash = usrPWHash.encode('utf-8')

    if(DBHelper.check_passwords(password, usrPWHash)):
        currDte = str(datetime.now())
        updatedLogin = DBHelper.update_value("UserAcct", "LastLogin", currDte, "Username", username)
        if not updatedLogin:
            DBHelper.update_value("UserAcct", "LastLogin", currDte, "Email", username)
        return jsonify({"message": "Login successful", "status": 200}), 200
    return jsonify({"message": "Invalid login credentials", "status": 404}), 404

@app.route('/')
def home():
    return "Home route"

if __name__ == '__main__':
     run_db_checks()
     app.run(host='0.0.0.0', port=5000)