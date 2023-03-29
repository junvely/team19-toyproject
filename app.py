from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.ebm0gtg.mongodb.net/?retryWrites=true&w=majority')
db = client.test


@app.route('/')
def account():
    return render_template('signup.html')

@app.route('/userget', methods=["GET"])
def user_get():
    all_users = list(db.user.find({},{'_id':False}))
    return jsonify({'result': all_users})

@app.route("/adduser", methods=["POST"])
def add_user():
   id_receive = request.form['id_give']
   pw_receive = request.form['pw_give']
   name_receive = request.form['name_give']
   nickname_receive = request.form['nickname_give']

   doc = {
      'user_id': id_receive,
      'password': pw_receive,
      'name': name_receive,
      'nickname': nickname_receive
    }
   db.user.insert_one(doc)
   return jsonify({'msg': '회원가입이 완료되었습니다'})

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)