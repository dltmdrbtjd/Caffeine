from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbhomework

from lib import KakaoLocalAPI_Controller
api = KakaoLocalAPI_Controller.KakaoLocalAPI('772f46499b4c765949e994cc27e7eba0')


# HTML 화면 보여주기
@app.route('/')
def homework(): 
    return render_template('index.html')

@app.route('/favorite')
def favorite():
    return render_template('favorite.html')

@app.route('/like')
def like():
    return render_template('like.html')

@app.route('/info')
def info():
    return render_template('info.html')

# 현재주소 불러오기
@app.route('/address', methods=['GET'])
def address():
    lat = request.args.get('lat_give')
    lon = request.args.get('lon_give')
    return api.geo_coord2regioncode(lon, lat)

# 검색기능
@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('keyword_give')
    return api.search_keyword(f'{query}')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
