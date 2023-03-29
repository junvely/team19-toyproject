from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.ebm0gtg.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.test

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/account')
def account():
   return render_template('account.html')

@app.route('/feed')
def feed():
   return render_template('feed.html')

@app.route('/feed/write')
def feed_write():
   return render_template('feedwrite.html')

@app.route('/feed/update')
def feed_update():
   return render_template('.html')

# 회원가입 완료시 회원 정보를 user table에 저장하는 POST요청
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


# 게시글 작성 완료시 게시글을 feed table에 저장하는 POST요청
@app.route("/addfeed", methods=["POST"])
def add_feed():
   nickname_receive = request.form['nickname_give']
   title_receive = request.form['title_give']
   body_receive = request.form['body_give']
   date_receive = request.form['date_give']

   doc = {
      'nickname': nickname_receive,
      'title': title_receive,
      'body': body_receive,
      'date': date_receive 
    }
   
   db.feed.insert_one(doc)
   return jsonify({'msg': '피드 작성 완료!'})



# 유저 정보 가져오는 GET요청
@app.route("/userget", methods=["GET"])
def user_get():
   all_users = list(db.user.find({},{'_id':False}))
   return jsonify({'result': all_users})

# 게시글 정보 가져오는 GET요청
@app.route("/feedget", methods=["GET"])
def feed_get():
   all_feeds = list(db.feed.find({},{'_id':False}))
   return jsonify({'result': all_feeds})




# @app.route("/delete", methods=["POST"])
# def guestbook_post2():
#     name_receive = request.form['name_give']
#     comment_receive = request.form['comment_give']
#     print(name_receive)

#     db.fan.delete_one({'comment': comment_receive})

#     return jsonify({'msg': '삭제 완료!'})



# @app.route("/guestbook", methods=["GET"])
# def user_get():
#     all_users = list(db.user.find({},{'_id':False}))
#     return jsonify({'result': all_users})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5001, debug=True)