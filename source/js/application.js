let application = () => {
  console.log($(".category-carousel").length);
  for (let i = 0; i < $(".category-carousel").length; i++) {
    console.log(i);
    const $mainCarousel = $(`.carousel-0${i + 1} .application-main-carousel`);
    const $dotCarousel = $(`.carousel-0${i + 1} .application-dot-carousel`);

    $mainCarousel.slick({
      dots: false,
      arrows: false,
      autoplay: false,
      autoplaySpeed: "3000",
      slidesToShow: 1,
      focusOnSelect: true,
      asNavFor: $dotCarousel,
    });
    $dotCarousel.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      focusOnSelect: true,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
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

  $(".category-btn").on("click", () => {
    $(".category-box").show();
  });
  $(".category-box .category-item").on("click", function () {
    $(".category").text($(this).text());
    $(".category-box").hide();
    $(".category-carousel").removeClass("active");
    $(`.carousel-0${$(this).index() + 1}`).addClass("active");
  });
  $(".category-box").hide();
};
