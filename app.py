from flask import Flask, render_template, jsonify, request, redirect
app = Flask(__name__)
from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.ebm0gtg.mongodb.net/?retryWrites=true&w=majority')
db = client.test
import jwt, datetime


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/account')
def account():
    return render_template('account.html')

SECRET_KEY = 'secret_key'
print(SECRET_KEY)
@app.route("/login", methods=["POST"])
def login_post():
    id_receive = request.form['id_give']
    password_receive = request.form['password_give']

    userData = db.user.find_one({"user_id" : id_receive},{'_id':False})
    user_id = userData["user_id"]
    password = userData["password"]
    name = userData["name"]
    nickname = userData["nickname"]

    print(userData)
    print(userData and user_id == id_receive and  password == password_receive)
    if userData and user_id == id_receive and  password == password_receive :
    # 토큰 리턴하고
        payload = {
         'user_id': user_id,
         'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    # home으로 이동
        return jsonify({'result': True, 'token': token, 'user_id' : user_id, 'name' : name, "nickname" : nickname})
    
    else : return {"result": False}, 404


        


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
