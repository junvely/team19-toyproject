$(document).ready(function () {
  myfeed_get();
});

function myfeed_get() {
  let tokens = [];
  $("#cards").empty();
  fetch("/tokenget")
    .then((res) => res.json())
    .then((data) => {
      let token = data["result"];
      for (let i = 0; i < token.length; i++) {
        tokens.push(token[i].Access_token);
      }
      console.log(token);
      if (tokens.includes(sessionStorage.token)) {
        let formData = new FormData();
        formData.append("token_give", sessionStorage.token);

        //토큰을 갖고있는 사람의 닉네임
        let usernicknamePromise = fetch("/tokengive", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => data["result"].nickname);
        //전체 게시물
        let feedsPromise = fetch("/feedget")
          .then((res) => res.json())
          .then((data) => data["result"]);

        // Promise.all을 사용하여 usernickname과 feeds를 한 번에 받아옴
        Promise.all([usernicknamePromise, feedsPromise]).then(
          ([usernickname, feeds]) => {
            console.log(usernickname, feeds);
            let arr = [];
            for (let i = 0; i < feeds.length; i++) {
              if (usernickname === feeds[i].nickname) {
                arr.push(feeds[i]);
              }
            }
            for (let j = 0; j < arr.length; j++) {
              console.log((arr[j].url))
              let temp_feeds_html = `
                <div class="card" id="card-${j}">
                  <div class="card-img"><img src="${arr[j].url}" width=100%, height=100%/></div>
                  <div class="card-title">${arr[j].title}</div>
                  <p class="card-body">${arr[j].description}</p>
                  <div class="like-wrapper">
                    <div class="like-count"><span><span class="like">♥️</span><span id="like-count-${j}">${arr[j].like}</span></div>
                    <div class="like-btn-wrapper"><button id="like-btn-${j}" class="like-btn" data-card-id="${j}">좋아요♥️</button></div>
                  </div>
                  <div class='card-footer'>
                    <p>${arr[j].nickname}</p>
                    <p>${arr[j].date.split(".")[1]}월 ${arr[j].date.split(".")[2]}일</p>
                  </div>
                  <div class='udbutton-wrapper'>
                    <button onclick="updatefeed(""${(arr[j].url)}"")">수정하기</button>
                    <button onclick="deletefeed(""${(arr[j].url)}"")">삭제하기</button>
                  </div>
                </div>
              `;
              $("#cards").append(temp_feeds_html);
            }
          }
        );
      }
    });
}


function updatefeed(url) {
  let formData = new FormData();
  formData.append("url_give", url);
  return fetch("/updatefeed", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"])
    });
}



function deletefeed(url) {
  let formData = new FormData();
  formData.append("url_give", url);
  return fetch("/deletefeed", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"])
    });
}