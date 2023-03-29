"use strict";
import { login } from "./account-api.js";

const loginBtn = document.querySelector("#login-button");

let userData = {};

const loginValidation = () => {
  const userId = document.querySelector("#userId");
  const userPw = document.querySelector("#userPw");
  const idAlert = document.querySelector(".userId-alert");
  const pwAlert = document.querySelector(".userPw-alert");

  if (!userId.value) {
    idAlert.innerText = "아이디를 입력해 주세요";
    return;
  } else {
    idAlert.innerText = "";
  }

  if (!userPw.value) {
    pwAlert.innerText = "비밀번호를 입력해 주세요";
    return;
  } else {
    pwAlert.innerText = "";
  }

  userData.id = userId.value;
  userData.password = userPw.value;
  loginResult();
};

const loginResult = async () => {
  const { result, token, user_id, name, nickname } = await login(userData);
  if (result) {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
    user_id
      ? localStorage.setItem("user_id", user_id)
      : localStorage.removeItem("user_id");
    name ? localStorage.setItem("name", name) : localStorage.removeItem("name");
    nickname
      ? localStorage.setItem("nickname", nickname)
      : localStorage.removeItem("nickname");
    location.href = "/";
  } else {
    alert("아이디 정보가 일치하지 않습니다.");
  }
};

loginBtn.addEventListener("click", loginValidation);
console.log(loginBtn);
