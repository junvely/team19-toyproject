# team19-toyproject

1. 프로젝트 Description
펫스타그램
- 내가 사랑하는 반려동물을 자랑하는 SNS. 회원가입 후 내 반려동물도 자랑해보세요!


2. 프로젝트 정보
- 설치(Getting Started / Installation)
	CSS: 별도 설치 필요 없음
	JavaScript: jQuery, Swiper, Cloudinary
	Python: Pymongo, dnsphython, pyjwt, request
	
- 사용 환경
	HTML, JS, CSS 및 Python Flask, MongoDB
	
- 간단한 사용 방법 및 예제
	메인페이지에서 로그인을 한 뒤 게시글을 작성합니다. 게시글은 이미지를 업로드할 수 있으며, 다른 회원들이 업로드한 게시글도 함께 볼 수 있습니다.


3. 외부리소스 정보
- Swiper 기능을 이용해 팝업창을 구성했고,  Cloudinary를 사용해 이미지 업로드를 구현함.


**#team19-toyproject-signup**
<h2>회원가입 페이지</h2><br/> 
이 코드는 회원가입을 위한 웹페이지를 구현하기 위한 코드입니다. 이 페이지는 서버와의 통신을 위해 fetch() 함수를 사용합니다. 또한 FormData를 사용하여 사용자가 입력한 정보를 서버로 전송합니다.<br/> 

<h2>사용된 언어 및 프레임워크</h2><br/> 
HTML<br/> 
CSS<br/> 
JavaScript<br/> 

<h2>파일 구성</h2><br/> 
signup.html: 회원가입 페이지의 HTML 파일<br/>
signup.css: 회원가입 페이지의 CSS 파일<br/> 
signup.js: 회원가입 페이지의 JavaScript 파일<br/> 

<h2>주요 기능</h2><br/> 
이름, 이메일, 닉네임, 비밀번호를 입력하여 회원가입을 할 수 있습니다.<br/> 
입력된 정보를 서버로 전송하여 회원가입을 완료합니다.<br/> 
사용자가 입력한 정보를 유효성 검사를 통해 확인하고, 필요한 입력칸을 확인하지 않았을 경우 회원가입이 불가능하다는 알림을 띄웁니다.<br/> 
서버에서는 이미 가입된 이메일 또는 닉네임이 있는지 확인하고, 이 결과값을 클라이언트로 전달합니다.<br/> 

<h2>주요 함수</h2><br/> 
sendForm(): 버튼에 해당 함수를 적용하여 사용자가 입력한 정보를 서버로 전송합니다.<br/> 
checkName(): 이름이 한글로만 적용된 2~5글자 사이인지 확인합니다.<br/> 
checkEmail(): 이메일 형식이 맞는지 확인하고, 이미 가입된 이메일인지 확인합니다.<br/> 
checkNickname(): 닉네임이 한글 또는 영어로 이루어져 있고, 이미 가입된 닉네임인지 확인합니다.<br/> 
checkPw1(): 영문, 숫자 포함 8~20자 내로 입력된 비밀번호인지 확인합니다.<br/> 
checkPw2(): checkPw1과 동일한 비밀번호가 입력됐는지 확인합니다.<br/> 

