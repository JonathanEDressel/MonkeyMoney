# Example using Flask
from flask import Flask, jsonify, request, abort
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

@app.route('/about', methods=['GET'])
def about():
    return "Hello from the ABOUT page!"

@app.route('/users/login', methods=['POST'])
def user_profile():
    # print(email, password)
    print(request.json)
    return ""

@app.route('/')
def home():
    return "Hello from the HOME page!"

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=5000)