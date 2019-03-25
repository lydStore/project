//验证码倒计时
function setTime(obj) {
  var time = 60;
  clearInterval(timer);
  var timer = setInterval(function() {
    time--;
    if (time > 0) {
      $(obj)
        .text(time + "S后重新发送")
        .attr("disabled", true)
        .addClass("current");
    } else {
      time = 60;
      $(obj)
        .text("发送验证码")
        .attr("disabled", false)
        .removeClass("current");
    }
  }, 1000);
}

//
