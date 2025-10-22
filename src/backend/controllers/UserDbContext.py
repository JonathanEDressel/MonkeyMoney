from flask import jsonify
from Extensions import limiter
import helper.Helper as DBHelper

def get_users():
    try:
        sql = "SELECT Username, FirstName, LastName, Email, PhoneNumber, CreatedDate, LastLogin FROM UserAcct;"
        usrs = DBHelper.run_query(sql, None, fetch=True)
        return jsonify({"message": usrs, "status": 200}), 200
    except Exception as e:
        return jsonify({"message": e, "status": 400}), 400
    
def add_taxable_account():
    print("placeholder")
    
def add_personal_account():
    print("placeholder")