from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() #SQLAlchemy를 사용해 데이터베이스 저장

class Fcuser(db.Model):
    __tablename__ = 'fcuser'  
    id = db.Column(db.Integer, primary_key = True)   # id를 프라이머리키로 설정
    password = db.Column(db.String(64)) # 문자열길이
    userid = db.Column(db.String(32))
    username = db.Column(db.String(8))
