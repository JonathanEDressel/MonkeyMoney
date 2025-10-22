from dotenv import load_dotenv
from flask import jsonify
from email.mimie.text import MIMEText
import smtplib
import os

load_dotenv()

EMAIL_SENDER=os.getenv("HOST_URL")
EMAIL_PASSWORD=os.getenv("EMAIL_PASSWORD")

def send_usr_email(toAddress, fromAddress, subject, body):
    try:
        msg = MIMEText(body)    
        msg["Subject"] = subject
        msg["From"] = fromAddress
        msg["To"] = toAddress
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.send_message(msg)
        return jsonify({"message": "Email successfully sent!", "status": 200}), 200
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400