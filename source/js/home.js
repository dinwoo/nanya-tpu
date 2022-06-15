let home = () => {
  $(".slider").slick({
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
  });
  $(".product-main-carousel").slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: "3000",
    slidesToShow: 1,
    focusOnSelect: true,
    asNavFor: ".product-dot-carousel",
  });
  $(".product-dot-carousel").slick({
    dots: false,
    arrows: false,
    slidesToShow: $(".product-dot-carousel .carousel-item").length - 1,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: ".product-main-carousel",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
  $("#product-pre").on("click", () => {
    $(".product-dot-carousel").slick("slickPrev");
  });
  $("#product-next").on("click", () => {
    $(".product-dot-carousel").slick("slickNext");
  });
};
