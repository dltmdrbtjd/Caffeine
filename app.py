import os
from flask import Flask, render_template, jsonify, request, redirect, session
from models import db, Fcuser, Likes, Favorites
from flask_wtf.csrf import CSRFProtect
from forms import RegisterForm, LoginForm
from lib import KakaoLocalAPI_Controller

app = Flask(__name__)
api = KakaoLocalAPI_Controller.KakaoLocalAPI('772f46499b4c765949e994cc27e7eba0')

# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/favorite')
# def favorite():
#     favorites = Favorites()
#     favorites.name = 
#     favorites.x = 
#     favorites.y = 
#     return render_template('favorite.html')

# @app.route('/like')
# def like():
#     likes = Likes()
#     likes.like += 1 
#     return render_template('like.html')

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/register', methods=['GET', 'POST'])  # 겟, 포스트 메소드 둘다 사용
def register():  # get 요청 단순히 페이지 표시 post요청 회원가입-등록을 눌렀을때 정보 가져오는것
    form = RegisterForm()
    if form.validate_on_submit():  # POST검사의 유효성검사가 정상적으로 되었는지 확인할 수 있다. 입력 안한것들이 있는지 확인됨.
        # 비밀번호 = 비밀번호 확인 -> EqulaTo

        fcuser = Fcuser()  # models.py에 있는 Fcuser
        fcuser.userid = form.data.get('userid')
        fcuser.username = form.data.get('username')
        fcuser.password = form.data.get('password')

        print(fcuser.userid, fcuser.password)  # 회원가입 요청시 콘솔창에 ID만 출력 (확인용, 딱히 필요없음)
        db.session.add(fcuser)  # id, name 변수에 넣은 회원정보 DB에 저장
        db.session.commit()  # 커밋
        return "가입 완료"  # post요청일시는 '/'주소로 이동. (회원가입 완료시 화면이동)
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()  # 로그인 폼 생성
    if form.validate_on_submit():  # 유효성 검사
        session['userid'] = form.data.get('userid')  # form에서 가져온 userid를 session에 저장

        return redirect('/')  # 로그인에 성공하면 홈화면으로 redirect

    return render_template('login.html', form=form)

@app.route('/logout',methods=['GET'])
def logout():
    session.pop('userid',None)
    return redirect('/')

@app.route('/login/sign_up')
def sign_up():
    return render_template('sign_up.html')

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

if __name__ == "__main__":
    basedir = os.path.abspath(os.path.dirname(__file__))  # db파일을 절대경로로 생성
    dbfile = os.path.join(basedir, 'db.sqlite')  # db파일을 절대경로로 생성

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbfile
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'wcsfeufhwiquehfdx'

    csrf = CSRFProtect()
    csrf.init_app(app)

    db.init_app(app)
    db.app = app
    db.create_all()  # db 생성

    app.run(host='127.0.0.1', port=5000, debug=True)
