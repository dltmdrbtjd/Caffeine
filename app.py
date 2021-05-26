from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb://test:test@localhost', 27017) #test:test는 아이디랑 비번.
# client = MongoClient('localhost', 27017) # aws에선 로컬이 아니므로 주석처리로 보관
db = client.dbhomework

from lib import KakaoLocalAPI
api = KakaoLocalAPI.KakaoLocalAPI('772f46499b4c765949e994cc27e7eba0')


# HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')

# 검색기능
@app.route('/search', methods=['POST'])
def search():
    query = request.form['keyword_give']
    return api.search_keyword(f'{query}')
