from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.ebm0gtg.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.test
import jwt, datetime


@app.route('/')
def home():
   return render_template('index.html')

@app.route('/login')
def login():
   return render_template('login.html')

@app.route('/signup')
def account():
   return render_template('signup.html')

@app.route('/feed')
def feed():
   return render_template('feed.html')

@app.route('/myfeed')
def myfeed():
   return render_template('myfeed.html')

@app.route('/feed/write')
def feed_write():
   return render_template('new-post.html')

@app.route('/feed/update')
def feed_update():
   return render_template('.html')

@app.route('/cloudinary')
def file_upload():
   return render_template('cloudinary.html')



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


# # 게시글 작성 완료시 게시글을 feed table에 저장하는 POST요청
# @app.route("/addfeed", methods=["POST"])
# def add_feed():
#    nickname_receive = request.form['nickname_give']
#    title_receive = request.form['title_give']
#    description_receive = request.form['description_give']
#    date_receive = request.form['date_give']
#    like_receive = request.form['like_give']

#    doc = {
#       'nickname': nickname_receive,
#       'title': title_receive,
#       'description': description_receive,
#       'date': date_receive,
#       'like': like_receive
#     }
   
#    db.feed.insert_one(doc)
#    return jsonify({'msg': '피드 작성 완료!'})



# 유저 정보 가져오는 GET요청
@app.route("/userget", methods=["GET"])
def user_get():
   all_users = list(db.user.find({},{'_id':False}))
   return jsonify({'result': all_users})

# 게시글 정보 가져오는 GET요청
@app.route("/feedget", methods=["GET"])
def feed_get():
   all_feeds = list(db.postInfos.find({},{'_id':False}))
   return jsonify({'result': all_feeds})

#준영님 
@app.route('/auth/user_data', methods=["POST"])
def get_user_data() :
    token_receive = request.form['token_give']
    userData = db.user.find_one({"Access_token" : token_receive},{'_id':False})
    if userData :
        user_id = userData["user_id"]
        name = userData["name"]
        nickname = userData["nickname"]
        return jsonify({'result': True, 'token': token_receive, 'user_id' : user_id, 'name' : name, "nickname" : nickname})
    else : return {"result": False}, 404

# token 가져오는 GET요청
@app.route('/gettoken', methods=["GET"])
def token_get():
   # "users" 컬렉션의 모든 문서 가져오기
   cursor = db.user.find()
   print(cursor)
   # "Access_token" 필드의 값을 리스트로 추출
   # access_token_list = []
   # for doc in cursor:
   #    access_token_list.append(doc['Access_token'])
   # # 결과 출력
   # print(access_token_list)


SECRET_KEY = 'secret_key'

print(SECRET_KEY)
@app.route("/auth/login", methods=["POST"])
def login_post():
    id_receive = request.form['id_give']
    password_receive = request.form['password_give']

    userData = db.user.find_one({"user_id" : id_receive},{'_id':False})
    if userData :
        user_id = userData["user_id"]
        password = userData["password"]

        print(userData)
        print(userData and user_id == id_receive and  password == password_receive)
        if userData and user_id == id_receive and  password == password_receive :
        # 토큰 리턴하고
            payload = {
            'user_id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            # 생성된 토큰 user 정보에 넣기 / 토큰이 있을 경우 새 토큰으로 교체
            db.user.update_one({'user_id':user_id},{'$set':{"Access_token": token}})
        # home으로 이동
            return jsonify({'result': True, 'token': token})
    
    else : return {"result": False}, 404


#대식님
# @app.route("/adduser", methods=["POST"])
# def add_user():
#    id_receive = request.form['id_give']
#    pw_receive = request.form['pw_give']
#    name_receive = request.form['name_give']
#    nickname_receive = request.form['nickname_give']

#    doc = {
#       'user_id': id_receive,
#       'password': pw_receive,
#       'name': name_receive,
#       'nickname': nickname_receive
#     }
#    db.user.insert_one(doc)
#    return jsonify({'msg': '회원가입이 완료되었습니다'})

#한빛님
@app.route('/test', methods=['POST'])
def test_post():
   title_receive = request.form['title_give']
   description_receive = request.form['description_give']
   date_receive = request.form['date_give']
   like_receive = request.form['like_give']
   url_receive = request.form['url_give']

   doc = {
      "title": title_receive,
      "description": description_receive,
      "date": date_receive,
      "like": like_receive,
      "url": url_receive
   }
   db.postInfos.insert_one(doc)
   return jsonify({'result': '저장완료!'})


@app.route('/like', methods=['POST'])
def increase_like_count():
    data = request.get_json()
    index = data.get('index')
    # get the document with the given index
    document = db.postInfos.find_one({"index": index})
    # increment the like count
    document["like"] += 1
    # update the document in the database
    db.postInfos.update_one({"_id": document["_id"]}, {"$set": document})
    # return the updated like count
    return jsonify({"like_count": document["like"]})

@app.route('/feedget')
def get_cards():
    # get all the documents from the cards collection
    cursor = db.postInfos.find()
    result = []
    for document in cursor:
        # remove the _id field from the document before adding to the result list
        del document["_id"]
        result.append(document)
    return jsonify({"result": result})






if __name__ == '__main__':
   app.run('0.0.0.0', port=5001, debug=True)