let application = () => {
  $(".category-btn").on("click", () => {
    $(".category-box").show();
  });
  $(".category-box .category-item").on("click", function () {
    $(".category").text($(this).text());
    $(".category-box").hide();
    $(".category-carousel").removeClass("active");
    $(`.carousel-0${$(this).index() + 1}`).addClass("active");
    // $(".category-carousel").hide();
    // $(`.carousel-0${$(this).index() + 1}`).show();
  });
  for (let i = 0; i < $(".category-carousel").length; i++) {
    const $mainCarousel = $(`.carousel-0${i + 1} .medical-main-carousel`);
    const $dotCarousel = $(`.carousel-0${i + 1} .medical-dot-carousel`);

    $mainCarousel.slick({
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: "3000",
      slidesToShow: 1,
      focusOnSelect: true,
      asNavFor: $dotCarousel,
    });
    $dotCarousel.slick({
      dots: false,
      arrows: false,
      slidesToShow: $dotCarousel.children().length - 1,
      centerMode: true,
      asNavFor: $mainCarousel,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    });
    $(`.carousel-0${i + 1} .pre-btn`).on("click", () => {
      $mainCarousel.slick("slickPrev");
    });
    $(`.carousel-0${i + 1} .next-btn`).on("click", () => {
      $mainCarousel.slick("slickNext");
    });
  }

  $(".category-box").hide();
  // $(".category-carousel").hide();
  // $(".carousel-01").show();
};
