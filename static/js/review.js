"use strict";

// 지역을 클릭되면 => 리뷰페이지로 이동됨과 동시에
// => class 컴포넌트 생성 및 정보전달, 렌더링

class Review {
  // 1. 지역 정보 받아오기
  constructor(place) {
    this.place = place;
  }

  // 2. 데이터통신 class => 지역 데이터 가져오기
  // 3. 지역 데이터로 시설 사진 및 컴포넌트 렌더링하기
  // 4. 새 class => 리뷰 가져오기, 리뷰 작성, 수정, 삭제 기능
  // 5. 리렌더링 시 어떻게 처리할 것인가?

  render() {
    const wrap = document.querySelector(".wrap");
    wrap.innerHTML = `<section class="review">${this.place}</section>`;
  }
}

const review = new Review("한강공원 입니다");
review.render();
