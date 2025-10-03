from flask import Blueprint, jsonify, request
from datetime import datetime
from Extensions import limiter
import helper.Helper as DBHelper

usr_bp = Blueprint("user", __name__)

@usr_bp.route('/add', methods=['POST'])
@limiter.limit("20 per minute")
def add_user():
    req = request.json
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