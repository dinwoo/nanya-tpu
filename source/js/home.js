let home = () => {
  $(".slider").slick({
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
  });
  $(".product-main-carousel").slick({
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    asNavFor: $(".product-dot-carousel"),
  });
  $(".product-dot-carousel").slick({
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 7,
    centerMode: true,
    asNavFor: $(".product-main-carousel"),
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
