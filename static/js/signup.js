function sendForm() {
    let name = document.getElementById("username").value;
    let email = document.getElementById("useremail").value;
    let nickname = document.getElementById("usernickname").value;
    let pw1 = document.getElementById("userpw1").value;

    let nameValid = checkName();
    let emailValid = checkEmail();
    let nicknameValid = checkNickname();
    let pw1Valid = checkPw1();
    let pw2Valid = checkPw2();

    if (nameValid && emailValid && nicknameValid && pw1Valid && pw2Valid) {
        let data = {
            name,
            email,
            nickname,
            password: pw1,
        }

        let formData = new FormData();
        formData.append("id_give", email);
        formData.append("pw_give", pw1);
        formData.append("name_give", name);
        formData.append("nickname_give", nickname);

        fetch('/adduser', { method: "POST", body: formData, })
            .then((res) => res.json())
            .then((data) => {
                alert(data["msg"]);
                window.location.href = "/login";

            });
    } else {
        alert('가입이 불가능합니다. 필수 입력칸을 확인해주세요')
    }



}







function checkName() {
    let name = document.getElementById("username").value;
    const nameRegex = /^[가-힣]+$/;

    if (nameRegex.test(name)) {
        if (name.length <= 1) {
            nameWarning.textContent = "이름이 너무 짧습니다";
            nameWarning.style.color = "red";
            nameWarning.style.fontSize = "12px";
            return false
        } else {
            nameWarning.textContent = "사용 가능한 이름 입니다";
            nameWarning.style.color = "green";
            nameWarning.style.fontSize = "12px";
            return true
        }
    } else {
        nameWarning.textContent = "2 ~ 5자 이내 한글만 가능합니다";
        nameWarning.style.color = "red";
        nameWarning.style.fontSize = "12px";
        return false
    }
}




function checkEmail() {
    let emails = []
    fetch('/userget')
        .then((response) => response.json())
        .then((data) => {
            let user = data['result'];
            for (let i = 0; i < user.length; i++) {
                emails.push(user[i].user_id)
            }
        })
    let email = document.getElementById("useremail").value;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (emailRegex.test(email)) {
        if (!emails.includes(email)) {
            emailWarning.textContent = "사용 가능한 이메일입니다";
            emailWarning.style.color = "green";
            emailWarning.style.fontSize = "12px";
            return true
        } else {
            emailWarning.textContent = "이미 가입된 이메일 입니다";
            emailWarning.style.color = "red";
            emailWarning.style.fontSize = "12px";
            return false
        }
    } else {
        emailWarning.textContent = "사용 할 수 없는 이메일 입니다";
        emailWarning.style.color = "red";
        emailWarning.style.fontSize = "12px";
        return false
    }
}



function checkNickname() {
    let nicknames = []
    fetch('/userget')
        .then((response) => response.json())
        .then((data) => {
            let user = data['result'];
            for (let i = 0; i < user.length; i++) {
                nicknames.push(user[i].nickname)
            }
        })
    let nickname = document.getElementById("usernickname").value;
    const nicknameRegex = /^[a-zA-Z가-힣]+$/;

    if (nicknameRegex.test(nickname)) {
        if (!nicknames.includes(nickname)) {
            nickWarning.textContent = "사용 가능한 닉네임 입니다";
            nickWarning.style.color = "green";
            nickWarning.style.fontSize = "12px";
            return true
        } else if (nickname.length < 2) {
            nickWarning.textContent = "사용 할 수 없는 닉네임 입니다";
            nickWarning.style.color = "red";
            nickWarning.style.fontSize = "12px";
            return false
        } else {
            nickWarning.textContent = "이미 가입된 닉네임 입니다";
            nickWarning.style.color = "red";
            nickWarning.style.fontSize = "12px";
            return false
        }
    } else {
        nickWarning.textContent = "한글, 영어만 입력 가능합니다";
        nickWarning.style.color = "red";
        nickWarning.style.fontSize = "12px";
        return false
    }
}


function checkPw1() {
    let pw1 = document.getElementById("userpw1").value;
    const pw1Regex = /^[a-zA-Z가-힣0-9]+$/;

    if (pw1Regex.test(pw1)) {
        if (pw1.length >= 8 && pw1.length <= 20) {
            pw1Warning.textContent = "사용 가능한 비밀번호 입니다";
            pw1Warning.style.color = "green";
            pw1Warning.style.fontSize = "12px";
            return true
        } else {
            pw1Warning.textContent = "영문 숫자 포함 8 ~ 20자 내로 입력해주세요";
            pw1Warning.style.color = "red";
            pw1Warning.style.fontSize = "12px";
            return false
        }
    } else {
        pw1Warning.textContent = "영문 숫자 포함 8 ~ 20자 내로 입력해주세요";
        pw1Warning.style.color = "red";
        pw1Warning.style.fontSize = "12px";
        return false
    }
}

function checkPw2() {
    let pw1 = document.getElementById("userpw1").value;
    let pw2 = document.getElementById("userpw2").value;
    const pw2Regex = /^[a-zA-Z가-힣0-9]+$/;

    if (pw2Regex.test(pw1)) {
        if (pw1 === pw2) {
            pw2Warning.textContent = "비밀번호가 같습니다";
            pw2Warning.style.color = "green";
            pw2Warning.style.fontSize = "12px";
            return true
        } else {
            pw2Warning.textContent = "비밀번호가 다릅니다";
            pw2Warning.style.color = "red";
            pw2Warning.style.fontSize = "12px";
            return false
        }
    } else {
        pw2Warning.textContent = "비밀번호가 다릅니다";
        pw2Warning.style.color = "red";
        pw2Warning.style.fontSize = "12px";
        return false
    }
}


