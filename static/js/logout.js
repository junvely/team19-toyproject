"use strict";
const loginBtn = document.querySelector(".login");
const logoutBtn = document.querySelector("#logout-button");
console.log(loginBtn, logoutBtn);

const logout = () => {
  sessionStorage.removeItem("token");
  location.href = "/login";
};

const displayLogout = () => {
  if (sessionStorage.getItem("token")) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
};

logoutBtn.addEventListener("click", logout);

(() => {
  displayLogout();
})();
