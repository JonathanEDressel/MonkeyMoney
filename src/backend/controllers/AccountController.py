from flask import Blueprint, jsonify, request, g
from helper.Security import requires_token
from Extensions import limiter
import controllers.AuthDbContext as _authCtx
import controllers.AccountDbContext as _actCtx

act_bp = Blueprint("act", __name__)

@act_bp.route('/add/personal', methods=['POST'])
@limiter.limit("60 per minute")
@requires_token
def add_personal():
    try:
        req = request.json
        name = req.get('name', '').strip()
        type = req.get('type', '').strip()
        balance = float(req.get('balance', '').strip())
        
        usr = _authCtx.get_current_user()
        if not usr or usr.Id <= 0:
            return jsonify({"result": None, "status": 401}), 401
        
        userid = usr.Id
        act = _actCtx.add_personal_account(userid, name, type)
        if act.Id <= 0:
            return jsonify({"result": f"Failed to add {name} account", "status": 400}), 400
        res = _actCtx.add_personal_record(act.Id, balance)
        print('act - ', act)
        return jsonify({"result": act, "status": 200}), 200
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"result": e, "status": 400}), 400
    
@act_bp.route('/personal', methods=['Get'])
@limiter.limit("60 per minute")
@requires_token
def get_personal_accounts():
    try:
        userid = _authCtx.get_current_user_id()
        if not userid or userid <= 0:
            return jsonify({"result": None, "status": 401}), 401
        acts = _actCtx.get_personal_accounts(userid)
        return jsonify({"result": acts, "status": 200}), 200
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"result": e, "status": 400}), 400