$(document).ready(function () {
  show_home_cards();
});

function show_home_cards() {
  $("#cards").empty();

  let arr = [];
  while (arr.length <= 3) {
    let ran = Math.round(Math.random() * 10);
    if (arr.includes(ran) === false) {
      arr.push(ran);
    }
  }

  fetch("/feedget")
    .then((res) => res.json())
    .then((data) => {
      let cards = data["result"];
      for (let i = 1; i <= arr.length; i++) {
        let temp_html = `
      <li class="card" href="#">
        <img src="${cards[arr[i]].url}" onerror="${
          this.src
        }="../static/img/cute.jpg"/>
        <div class="card__content">
          <h3 class="card__title">${cards[arr[i]].title}</h3>
          <p class="card__text">${cards[arr[i]].description}</p>
        </div>
        <div class="like-wrapper">
              <div class="like-count"><span id="like-count-${i}"><span class="like">♥️ </span>${
          cards[i].like
        }</span></div>
              <div class="like-btn-wrapper"><button id="like-btn-${i}" class="like-btn" data-card-id="${i}">좋아요♥️</button></div>
              </div>
              <div class='card-footer'>
                <p>${cards[i].nickname ? cards[i].nickname : "닉네임"}</p>
                <p>${cards[i].date.split(".")[1]}월 ${
          cards[i].date.split(".")[2]
        }일</p>
        </div>
      </li>
            `;
        $("#cards").append(temp_html);
      }
    });
}

const postBtn = document.querySelector(".new-post-box");

const goLoginPage = () => {
  if (sessionStorage.getItem("token") === null) {
    alert("로그인이 필요한 서비스입니다!");
    location.href = "/login";
  } else {
    location.href = "/feed/write";
  }
};

postBtn.addEventListener("click", goLoginPage);

const loginBtn = document.querySelector('a[href="login"]');
const logoutBtn = document.querySelector("logout-button");
const token = sessionStorage.getItem("token");

if (token) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("token");
  });
} else {
  logoutBtn.style.display = "none";
  loginBtn.style.display = "inline-block";
}
