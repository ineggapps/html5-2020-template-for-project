$(function () {
  //오버레이 창이 떴을 때 스크롤 막기
  $(".overlay").on("scroll touchmove mousewheel", function (e) {
    if ($(this).hasClass("show")) {
      e.preventDefault();
    }
  });
});

//모바일 버튼 클릭
$(function () {
  $("#btnGnbMenu").click(function () {
    $(".columnSide").css("top", 0);
    $(".columnSide").addClass("show");
    $(".overlay").addClass("show");
  });

  $(".overlay").click(function () {
    $(".columnSide").css("top", "0").removeClass("show");
    $(".overlay").removeClass("show");
  });
});

//이미지 첨부 버튼 클릭
$(function () {
  $("#btnProjectImage").click(function () {
    $("#projectImage").click();
  });
});

//키워드 입력
$(function () {
  //엔터키 누르면 해시태그 등록하기
  $("#keyword").keypress(function (e) {
    const code = e.keyCode;
    if (code == 13) {
      //엔터 입력되면
      const keyword = $(this).val();
      addItem(keyword);
      $(this).val("");
      $(this).focus();
    }
  });
  //지우기 누르면 해시태그 삭제하기
  $("body").on("click", ".btnHashDelete", function () {
    const length = getCountHashItem();
    $($(this)).closest("li").remove();
    refreshHashTitle(length - 1 - 1); //template 제외
  });
});

function addItem(keyword) {
  if (keyword.trim() == "") {
    return;
  }
  const length = getCountHashItem();
  if (length - 1 == 10) {
    //template 제외
    alert("10개 이상 추가할 수 없습니다.");
    return;
  }
  refreshHashTitle(length);
  const $template = $("ul.hashItems").eq(0).find(".template").eq(0).clone(1);
  $template
    .removeClass("template")
    .find(".text")
    .eq(0)
    .text("#" + keyword);
  $template.appendTo(".hashItems");
}

function getCountHashItem() {
  return $("ul.hashItems li").length;
}

function refreshHashTitle(length) {
  const text = length + "/10개의 해시 태그";
  $("#hashTitle").text(text);
}
