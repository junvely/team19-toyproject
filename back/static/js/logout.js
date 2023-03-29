"use strict";
import { userData } from "./login-api.js";

const logoutBtn = document.querySelector("#logout-button");
const userBtn = document.querySelector("#user-button");

const logout = () => {
  sessionStorage.removeItem("token");
  location.href = "/login";
};

const getUserDataResult = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const data = await userData(token);
  }
};

logoutBtn.addEventListener("click", logout);

userBtn.addEventListener("click", getUserDataResult);
