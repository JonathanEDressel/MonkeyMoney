from controllers.AuthController import auth_bp
from controllers.UserController import usr_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(usr_bp, url_prefix='/user')
