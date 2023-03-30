$(document).ready(function () {
  show_home_cards();
});


function show_home_cards() {
  $('#cards').empty()
  
  let arr= []
  while (arr.length <= 4) {
    let ran =Math.round(Math.random() * 10)
    if (arr.includes(ran) === false) {
      arr.push(ran)
    }
  }
  console.log(arr)
  fetch('/feedget').then((res) => res.json()).then((data) => {
    let cards = data['result']
    for (let i = 1; i <= cards.length; i++) {
      let temp_html = `
      <a class="card" href="#">
        <div class="card__background"><img src="${cards[arr[i]].url}" width=100%, height=100%/></div>
        <div class="card__content">
        <p class="card__category">${cards[arr[i]].title}</p>
        <h3 class="card__heading">${cards[arr[i]].description}</h3>
      </div>
    </a>
            `
      $('#cards').append(temp_html)
    }
  })

}


const loginBtn = document.querySelector('a[href="login"]');
const logoutBtn = document.querySelector('a[href="logout"]');
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