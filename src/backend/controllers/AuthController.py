from flask import Blueprint, jsonify, request
from datetime import datetime
from Extensions import limiter
# from helper.Security import requires_token, create_jwt
import helper.Helper as DBHelper
import helper.Security as Security

auth_bp = Blueprint("auth", __name__)

def has_admin():
    try:
        h = DBHelper.encrypt_password("password")
        currDte = str(datetime.now())
        res = DBHelper.run_query("SELECT Username FROM UserAcct Where Username = %s or Email = %s", 
                                ("Admin", "jonathanedressel@gmail.com"), 
                                True)
        if not res:
            adm_uuid = DBHelper.create_uuid()
            sql = """
            INSERT INTO UserAcct
            (Username, UserPassword, UUID, FirstName, LastName, Email, CreatedDate,
            ConfirmedEmail, TwoFactor, AdminLevel, IsAdmin, IsDemo)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            params = ("Admin", h, adm_uuid, "Jonathan", "Dressel", "jonathanedressel@gmail.com", currDte,
                    1, 0, "Site", 1, 0)
            DBHelper.run_query(sql, params)
    except Exception as e:
        print(f"ERROR: {e}")

def get_user_token(username, uuid):
    token = Security.create_jwt(uuid, username)
    return token

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("20 per minute")
def user_profile():
    try:
        req = request.json
        username = req.get('username', '').strip()
        password = req.get('userpassword', '').strip()
        if not username or not password:
            return jsonify({"message": "Please enter a username and password", "status": 400}), 400
        
        sql = f"SELECT UserPassword, Username, UUID FROM UserAcct WHERE Username=%s or Email=%s"
        vars = (username, username)
        usr = DBHelper.run_query(sql, vars, True)
        if not usr:
            return jsonify({"message": "Invalid login credentials", "status": 400}), 400
        usrPWHash = usr[0]['UserPassword']
        if isinstance(usrPWHash, str):
            usrPWHash = usrPWHash.encode('utf-8')

        token = get_user_token(usr[0]['Username'], usr[0]['UUID'])
        if (DBHelper.check_passwords(password, usrPWHash)) and (token is not None):
            currDte = str(datetime.now())
            updatedLogin = DBHelper.update_value("UserAcct", "LastLogin", currDte, "Username", username)
            if not updatedLogin:
                DBHelper.update_value("UserAcct", "LastLogin", currDte, "Email", username)
            return jsonify({"token": token}), 200
        return jsonify({"message": "Invalid login credentials", "status": 409}), 409
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
        
        sql = f"SELECT UserPassword FROM UserAcct WHERE Username=%s or Email=%s"
        vars = (username, username)
        usr = DBHelper.run_query(sql, vars, True)
        if usr:
            return jsonify({"message": "Failed to create user account", "status": 409}), 409

        adm_uuid = DBHelper.create_uuid()
        hashedPassword = DBHelper.encrypt_password(password)
        sql = f"INSERT INTO UserAcct (Username, Email, FirstName, LastName, UserPassword, UUID, PhoneNumber, CreatedDate) " \
            "VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"
        vars = (username, username, fname, lname, hashedPassword, adm_uuid, phonenumber, datetime.now())
        res = DBHelper.run_query(sql, vars, fetch=False)
        token = get_user_token(username, adm_uuid)
        if not res or not token:
            return jsonify({"message": "Failed to create user account", "status": 400}), 400
        return jsonify({"token": token}), 200
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400
    