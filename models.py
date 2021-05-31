from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() #SQLAlchemy를 사용해 데이터베이스 저장

class Fcuser(db.Model):
    __tablename__ = 'fcuser'  
    id = db.Column(db.Integer, primary_key = True)   # id를 프라이머리키로 설정
    password = db.Column(db.String(64)) # 문자열길이
    userid = db.Column(db.String(32), unique = True) # 가입한 id가 중복되지 않도록 unique설정. 
    username = db.Column(db.String(8))

class Likes(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer)
    like = db.Column(db.integer, default = 0, primary_key = True) # 좋아요 순서대로 표시되도록 좋아요 숫자를 키로 설정. 쿼리문을 desc로 작성해야함.
    
class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key = True)
    favorite = db.Column(db.Boolean, default = False)
    name = db.Column(db.String(64)) # 즐찾목록에 있는건 클릭하면 바로 검색되도록 상호, x, y, 범위를 저장. 범위는 1로 설정.
    x = db.Column(db.String(32) # api에서 x,y값은 문자로 들어가기 때문에 String
    y = db.Column(db.String(32)
    radius = db.Column(db.Integer, default = 1)
