from flask import Blueprint, jsonify, request
from datetime import datetime
from Extensions import limiter
import helper.Helper as DBHelper
import sqlite3

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("20 per minute")
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