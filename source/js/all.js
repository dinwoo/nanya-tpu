let all = () => {
  $(".ham").on("click", function () {
    $("header .main").addClass("active");
  });
  $(".close").on("click", function () {
    $("header .main").removeClass("active");
  });
  let showSubItem = false;
  $(".main-item:nth-child(3) .main-a").on("click", function () {
    if (!showSubItem) {
      showSubItem = true;
      $(".main-item:nth-child(3)").addClass("active");
    } else {
      showSubItem = false;
      $(".main-item:nth-child(3)").removeClass("active");
    }
  });
  let showLangItem = false;
  $(".mobile-lang p").on("click", function () {
    if (!showLangItem) {
      showLangItem = true;
      $(".mobile-lang").addClass("active");
    } else {
      showLangItem = false;
      $(".mobile-lang").removeClass("active");
    }
  });
};

all();
