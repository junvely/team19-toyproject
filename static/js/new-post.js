let inputTitle = document.querySelector("#titleInput");
let inputDescription = document.querySelector("#descriptionTextarea");
let inputImage = document.querySelector("#upload");
let add = document.querySelector("#addBtn");
const url = "https://api.cloudinary.com/v1_1/dilvblhxt/image/upload";
const form = document.querySelector("form");

let dataValue;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const files = document.querySelector("[type=file]").files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", "syveus47");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dataValue = data.url;
      });
  }
});

let nickname;

const addInfo = () => {
  getUserData();
  let info = {
    id: uniqueId(),
    title: inputTitle.value,
    nickname: nickname,
    description: inputDescription.value,
    date: postDate(),
    like: 0,
    url: dataValue,
  };
  if (inputTitle.value != "" && inputDescription.value != "") {
    hey(info);
    window.location.href = "http://localhost:5001/feed/write";
  } else {
    alert("BLANK ERRORRRRRRRRRRRRR!!!!!!!!!!!!!!!!");
  }
};

const postDate = () => {
  let newDate = new Date().toLocaleString();
  return newDate;
};

const uniqueId = () => {
  return Math.floor(Date.now() + Math.random() * 100);
};

const resetValue = () => {
  inputTitle.value = "";
  inputDescription.value = "";

  return resetValue;
};

const getUserData = () => {
  const token = sessionStorage.getItem("token");
  const formData = new FormData();
  formData.append("token_give", token);

  return fetch("/auth/user_data", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      nickname = data.nickname;
      return data.nickname;
    });
};

console.log(getUserData());

//서버에 보내는 함수 헤이
function hey(info, event) {
  console.log(info.nickname);
  // event.preventDefault();
  let formData = new FormData();
  formData.append("title_give", info.title);
  formData.append("description_give", info.description);
  formData.append("date_give", info.date);
  formData.append("like_give", info.like);
  formData.append("url_give", info.url);
  formData.append("nickname_give", info.nickname);
  if(info.url) {
    fetch("/test", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  } else {
    alert('사진올리기를 눌러주세요!')
  }

}

let loadFile = function (event) {
  let reader = new FileReader();
  reader.onload = function () {
    let output = document.getElementById("output");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  let label = document.querySelector("#label");
  label.classList.add("hide");
};

add.addEventListener("click", addInfo);
