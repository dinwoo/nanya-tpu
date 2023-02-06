let contact = () => {
  emailjs.init("CBuIX_-cJ0JRRuyxT");

  document.getElementById("sendEmail").addEventListener("click", function () {
    var templateParams = {
      type: $("select[name='type']").val(),
      name: $("input[name='name']").val(),
      phone: $("input[name='phone']").val(),
      mobile: $("input[name='mobile']").val(),
      email: $("input[name='email']").val(),
      message: $("textarea[name='message']").val(),
    };
    console.log(templateParams);
    emailjs.send("service_vtr4d7d", "template_xe407rm", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("SUCCESS!");
        $("select[name='type']").val("");
        $("input[name='name']").val("");
        $("input[name='phone']").val("");
        $("input[name='mobile']").val("");
        $("input[name='email']").val("");
        $("textarea[name='message']").val("");
      },
      function (error) {
        console.log("FAILED...", error);
        alert("寄送失敗");
      }
    );
  });
};
