"use strict";

import { userData } from "./login-api.js";

const userBtn = document.querySelector("#user-button");

export const getUserDataResult = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const data = await userData(token);
  }
};

userBtn.addEventListener("click", getUserDataResult);
