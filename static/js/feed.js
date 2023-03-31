$(document).ready(function () {
  show_cards();
  show_swipers();
});

function show_cards() {
  $("#cards").empty();
  fetch("/feedget")
    .then((res) => res.json())
    .then((data) => {
      let cards = data["result"];
      for (let i = 0; i < cards.length; i++) {
        let temp_cards_html = `
          <div class="card" id="card-${i}">
            <div class="card-img"><img src="${cards[i].url}"/></div>
            <div class="card-title">${cards[i].title}</div>
            <p class="card-body">${cards[i].description}</p>
            <div class="like-wrapper">
            <div class="like-count"><span><span class="like">♥️</span><span id="like-count-${i}">${cards[i].like}</span></div>
            <div class="like-btn-wrapper"><button id="like-btn-${i}" class="like-btn" data-card-id="${i}">좋아요♥️</button></div>
            </div>
            <div class='card-footer'>
              <p>닉네임</p>
              <p>${cards[i].date.split(".")[1]}월 ${
          cards[i].date.split(".")[2]
        }일</p>
            </div>
          </div>
        `;
        $("#cards").append(temp_cards_html);
      }
      // 좋아요 버튼 이벤트 처리
      document.querySelectorAll(".like-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const cardId = this.getAttribute("data-card-id");
          const likeCountEl = document.querySelector(
            `#card-${cardId} #like-count-${cardId}`
          );
          let likeCount = parseInt(likeCountEl.textContent);
          if (this.classList.contains("liked")) {
            likeCountEl.textContent = likeCount - 1;
            this.classList.remove("liked");
          } else {
            likeCountEl.textContent = likeCount + 1;
            this.classList.add("liked");
          }
        });
      });
    });
}

function modalOn(cardId) {
  const card = document.querySelector(`#${cardId}`);
  const cardModal = document.querySelector(".card-modal");
  const closeBtn = document.querySelector(".close-btn");

  card.addEventListener("click", function (event) {
    if (!event.target.classList.contains("like-btn")) {
      cardModal.classList.add("active");
    }
  });

  closeBtn.addEventListener("click", function () {
    cardModal.classList.remove("active");
  });

  cardModal.addEventListener("click", function (e) {
    if (e.target === this) {
      cardModal.classList.remove("active");
    }
  });

  const likeBtn = card.querySelector(".like-btn");
  const cardIndex = parseInt(cardId.split("-")[1]);

  likeBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    increaseLikeCount(cardIndex, event);
  });
}

function show_swipers() {
  $("#swiper").empty();
  fetch("/feedget")
    .then((res) => res.json())
    .then((data) => {
      let cards = data["result"];
      for (let i = 0; i < cards.length; i++) {
        let temp_swiper_html = `
          <div id="card-${i}" class="swiper-slide" style="display: flex;justify-content: center;">
            <div class="card">
              <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
              <div class="card-img"><img src="${cards[i].url}"></div>
              <div class="card-title">${cards[i].title}</div>
              <p class="card-body">${cards[i].description}</p>
              <div class="like-wrapper">
              <div class="like-count"><span><span class="like">♥️</span><span id="like-count-${i}">${cards[i].like}</span></div>
              <div class="like-btn-wrapper"><button id="like-btn-${i}" class="like-btn" data-card-id="${i}">좋아요♥️</button></div>
              </div>
              <div class='card-footer'>
                <p>닉네임</p>
                <p>${cards[i].date.split(".")[1]}월 ${
          cards[i].date.split(".")[2]
        }일</p>
                </div>
            </div>
          </div>
        `;
        $("#swiper").append(temp_swiper_html);

        document
          .querySelector(`#card-${i}`)
          .addEventListener("click", function () {
            modalOn(`card-${i}`);
          });

        // 좋아요 버튼 이벤트 처리
        // document.querySelector(`#like-btn-${i}`).addEventListener('click', function (event) {
        //   increaseLikeCount(i, event);
        // });
      }
    })
    .catch((err) => console.log(err));
}

// function increaseLikeCount(cardId, event) {
//   const likeCountEl = document.querySelector(`#card-${cardId} #like-count-${cardId}`);
//   let likeCount = parseInt(likeCountEl.textContent);
//   likeCountEl.textContent = likeCount + 1;
//   event.target.disabled = true; // 버튼 비활성화
// }
