from flask import Blueprint, jsonify, request
from datetime import datetime
from Extensions import limiter
import controllers.AuthDbContext as _authCtx
import controllers.EmailDbContext as _emailCtx
import helper.Helper as DBHelper
import helper.Security as Security

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("20 per minute")
def user_login():
    try:
        req = request.json
        username = req.get('username', '').strip()
        password = req.get('userpassword', '').strip()
        return _authCtx.user_login(username, password)
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400
    
@auth_bp.route('/signup',methods=['POST'])
@limiter.limit("5 per minute")
def create_account():
    try:
        req = request.json
        fname = req.get('firstname', '').strip()
        lname = req.get('lastname', '').strip()
        username = req.get('email', '').strip()
        phonenumber = req.get('phonenumber', '').strip()
        password = req.get('userpassword', '').strip()
        if not username or not password:
            return jsonify({"message": "Please enter a valid username and password", "status": 400}), 400
        return _authCtx.create_account(fname, lname, username, phonenumber, password)
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400
    
@auth_bp.route("/forgotPassword", methods=['POST'])
@limiter.limit("1 per minute")
def forgot_password():
    try:
        req = request.json
        useremail = str(req.get('email', '').strip())
        if not useremail:
            return jsonify({"message": "Please enter in a valid email", "status": 400}), 400
        
        params = (useremail, useremail)
        usr = DBHelper.run_query("SELECT Email FROM UserAcct Where Username = %s or Email = %s", params, True)
        if not usr:
            return jsonify({"message": "Please enter in a valid email", "status": 400}), 400
        
        return _emailCtx.send_usr_email(useremail, "Two FA Passcode", "Passcode: 1234")
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400