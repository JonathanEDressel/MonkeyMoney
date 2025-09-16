from flask import Flask, jsonify, request, abort
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from datetime import datetime
import helper.Helper as DBHelper
import sqlite3

app = Flask(__name__)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["60 per minute"]
)

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