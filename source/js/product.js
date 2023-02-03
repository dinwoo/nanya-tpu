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
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    $("#popup-pre").on("click", () => {
      $(".popup-main-carousel").slick("slickPrev");
    });
    $("#popup-next").on("click", () => {
      $(".popup-main-carousel").slick("slickNext");
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
  $("#specification-popup").on("click", () => {
    $("#specification-popup").hide();
  });
  $("#specification-popup figure.pic").on("click", (e) => {
    e.stopPropagation();
  });

  $(".certification-box .item").on("click", () => {
    if (!isSetCertification) setCertification();
    $("#certification-popup").show();
  });
  $("#certification-popup").on("click", () => {
    $("#certification-popup").hide();
  });
  $("#certification-popup .carousel-box").on("click", (e) => {
    e.stopPropagation();
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
