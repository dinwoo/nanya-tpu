let product = () => {
  let isSetCertification = false;
  function setCertification() {
    isSetCertification = true;
    $(".popup-main-carousel").slick({
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: "3000",
      slidesToShow: 1,
      focusOnSelect: true,
      asNavFor: $(".popup-dot-carousel"),
    });
    $(".popup-dot-carousel").slick({
      dots: false,
      arrows: false,
      slidesToShow: 3,
      centerMode: true,
      focusOnSelect: true,
      asNavFor: $(".popup-main-carousel"),
    });
    $("#popup-pre").on("click", () => {
      $(".popup-dot-carousel").slick("slickPrev");
    });
    $("#popup-next").on("click", () => {
      $(".popup-dot-carousel").slick("slickNext");
    });
    $("#certification-popup .pic-box .item").on("click", function () {
      $(".popup-main-carousel").slick("slickGoTo", $(this).data("index"));
    });
    $(".popup-main-carousel").on("afterChange", function () {
      $("#certification-popup .pic-box .item").removeClass("active");
      $("#certification-popup .pic-box .item")
        .eq($(".popup-main-carousel").find(".slick-active").data("index"))
        .addClass("active");
    });
  }
  $("#specification-btn").on("click", () => {
    $("#specification-popup").show();
  });
  $("#specification-popup .mask").on("click", () => {
    $("#specification-popup").hide();
  });

  $(".certification-box .item").on("click", () => {
    if (!isSetCertification) setCertification();
    $("#certification-popup").show();
  });
  $("#certification-popup .mask").on("click", () => {
    $("#certification-popup").hide();
  });

  $(".product-main-carousel").slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: "3000",
    slidesToShow: 1,
    focusOnSelect: true,
    asNavFor: $(".product-dot-carousel"),
  });
  $(".product-dot-carousel").slick({
    dots: false,
    arrows: false,
    slidesToShow: $(".product-dot-carousel .carousel-item").length - 1,
    centerMode: true,
    focusOnSelect: true,
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
