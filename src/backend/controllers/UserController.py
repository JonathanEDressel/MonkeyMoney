from flask import Blueprint, jsonify
from Extensions import limiter
import json
import helper.Helper as DBHelper

usr_bp = Blueprint("user", __name__)

# add internal user authentication
    # check if they are site admin
    # eventually do this in segments (1000 users at a time)
@usr_bp.route('/users', methods=['GET'])
@limiter.limit("30 per minute")
def get_users():
    try:
        sql = "SELECT Username, FirstName, LastName, Email, PhoneNumber, CreatedDate, LastLogin FROM UserAcct;"
        usrs = DBHelper.run_query(sql, None, fetch=True)
        return jsonify({"message": usrs, "status": 200}), 200
    except Exception as e:
        return jsonify({"message": e, "statu": 400}), 400