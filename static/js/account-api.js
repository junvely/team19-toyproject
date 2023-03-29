"use strict";
// login

// 전달받은 아이디와 비밀번호 객체를 서버에 전송
// 서버에서 1. 아이디가 있는 객체 뽑아와서, 2. 비밀번호가 일치하는지 확인
// 3. 있으면 => return 값으로 로그인 성공, JWT 토큰 생성하여 발송
// 없으면 => 로그인 실패 전송

export const login = async (userData) => {
  // fetch() => 서버로 보냄
  let formData = new FormData();
  formData.append("id_give", userData.id);
  formData.append("password_give", userData.password);

  let result;
  await fetch("/login", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      result = data;
    })
    .catch((error) => console.log(`로그인 실패 :${error}`));

  return result;
};
