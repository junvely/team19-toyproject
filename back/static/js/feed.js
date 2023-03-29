$(document).ready(function () {
  show_cards();
  // modal_cards();
});

function show_cards() {
  $('#cards').empty()
  $('#swiper').empty()

  for (let i = 1; i <= 15; i++) {
    let temp_cards_html = `
    <div class="card" id="card-${i}" onclick="modalOn('card-${i}')">
    <div class="card-img"></div>
    <div class="card-title">이미지${i}
    </div>
    <p class="card-body">본문${i}</p>
    <div class="card-like">좋아요</div>
    <div class='card-footer'>
      <p>닉네임</p>
      <p>날짜</p>
    </div>
  </div>
          `

    let temp_swiper_html = `
          <div id="card-${i}" class="swiper-slide" style="display: flex;justify-content: center;">
              <div class="card">
                <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
                <div class="card-img"></div>
                <div class="card-title">제목${i}</div>
                <p class="card-body">본문${i}</p>
                <div class="card-like">좋아요</div>
                <div class='card-footer'>
                  <p>닉네임</p>
                  <p>날짜</p>
                </div>
              </div>
            </div>
                `
    $('#cards').append(temp_cards_html)
    $('#swiper').append(temp_swiper_html)
  }
}

// function modal_cards() {
//   $('#swiper').empty()
//   for (let i = 1; i <= 15; i++) {
//     let temp_swiper_html = `
//     <div id="card-${i}" class="swiper-slide" style="display: flex;justify-content: center;">
//         <div class="card">
//           <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
//           <div class="card-img"></div>
//           <div class="card-title">제목${i}</div>
//           <p class="card-body">본문${i}</p>
//           <div class="card-like">좋아요</div>
//           <div class='card-footer'>
//             <p>닉네임</p>
//             <p>날짜</p>
//           </div>
//         </div>
//       </div>
//           `
//     $('#swiper').append(temp_swiper_html)
//   }
// }

function modalOn(cardId) {
  const card = document.querySelector(`#${cardId}`);
  const cardModal = document.querySelector('.card-modal');
  const closeBtn = document.querySelector('.close-btn');

  card.addEventListener('click', function () {
    cardModal.classList.add('active');
  });

  closeBtn.addEventListener('click', function () {
    cardModal.classList.remove('active');
  });

  cardModal.addEventListener('click', function (e) {
    if (e.target === this) {
      cardModal.classList.remove('active');
    }
  });
}




