from email.mimie.text import MIMEText
from flask import jsonify
import EmailDbContext as _emailDbCtx
import smtplib

def send_usr_email(toAddress, fromAddress, subject, body):
    try:
        print("Sending OTP")
        return _emailDbCtx.send_usr_email(toAddress, fromAddress, subject, body)
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"result": e, "status": 400}), 400