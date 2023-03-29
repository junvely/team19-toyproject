from pymongo import MongoClient
import certifi

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.ebm0gtg.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.test


@app.route('/')
def home():
   return render_template('new-post.html')

@app.route('/cloudinary')
def upload():
   return render_template('cloudinary.html')

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

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5001,debug=True)