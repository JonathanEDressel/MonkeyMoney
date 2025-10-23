from flask import Blueprint, jsonify
from Extensions import limiter
import controllers.UserDbContext as _usrCtx

usr_bp = Blueprint("user", __name__)

# add internal user authentication
    # check if they are site admin
    # eventually do this in segments (1000 users at a time)
@usr_bp.route('/users', methods=['GET'])
@limiter.limit("30 per minute")
def get_users():
    try:
        return _usrCtx.get_users()
    except Exception as e:
        return jsonify({"result": e, "status": 400}), 400
    
def add_taxable_account():
    try:
        return _usrCtx.add_taxable_account()
    except Exception as e:
        return jsonify({"result": e, "status": 400}), 400
    
def add_personal_account():
    try:
        return _usrCtx.add_personal_account()
    except Exception as e:
        return jsonify({"result": e, "status": 400}), 400