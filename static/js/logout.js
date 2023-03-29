const logoutBtn = document.querySelector("#logout-button");

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  localStorage.removeItem("nickname");
  location.href = "/account";
};

logoutBtn.addEventListener("click", logout);
