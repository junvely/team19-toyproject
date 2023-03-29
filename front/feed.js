
function modalOn() {
  const card = document.querySelector('.card');
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