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
      clearInterval(timer);
      $(obj)
        .text("发送验证码")
        .attr("disabled", false)
        .removeClass("current");
    }
  }, 1000);
}

//获取url参数值的两种方式
function getQueryName(name) {
  //获取url的的参数
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//滚动到某个位置
function scrollToLocal(h, durition) {
  //h int，文档滚动到距离顶部的高度
  durition = isNaN(durition) ? 200 : durition;
  $("html,body")
    .stop()
    .animate({ scrollTop: h }, durition);
}

//通用请求方法，例：var data = request('/app/task/reward');
function aldRequest(uri) {
  var args = {};
  var callback = "";
  if (arguments.length >= 3) {
    //3参数(有args,callback)
    args = arguments[1];
    callback = arguments[2];
  } else if (arguments.length >= 2) {
    //2参数(有args)
    args = arguments[1];
    callback = "";
  }
  $.post(
    uri,
    args,
    function(data) {
      if (data.ret > 0) {
        if (data.ret == 1) {
          //未登录
          alert("请登录");
        } else {
          alert(data.msg);
        }
      } else {
        //0请求成功
        if (typeof callback === "function") {
          callback(data.data);
        } else {
          alert(callback);
        }
      }
    },
    "json"
  );
}

//设置cookie
function setCookie(name, value) {
  var Hours = 1;
  var exp = new Date();
  exp.setTime(exp.getTime() + Hours * 60 * 1000 * 60);
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    exp.toGMTString() +
    ";path=/";
  return true;
}
//读取cookie
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
//删除cookie
function removeCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//showtoast
// function showToast(msg, durication) {
//   durication = isNaN(durication) ? 1.5 * 1000 : durication;
//   let oDiv = document.createElement("div");
//   oDiv.classList.add("toast");
//   oDiv.innerHTML = msg;
//   document.body.appendChild(oDiv);
//   setTimeout(function() {
//     oDiv.style.webkitTransition = "all ease-in .5s 0s";
//     oDiv.style.opacity = "0";
//     setTimeout(function() {
//       document.body.removeChild(oDiv);
//     }, 500);
//   }, durication);
// }
function showToast(msg, durication) {
  durication = isNaN(durication) ? 1.5 * 1000 : durication * 1000;
  var html = '<div class="toast"><span>' + msg + "</span></div>";
  console.log($(".toast").length);
  if ($(".toast").length == 0) {
    $("body").append(html);
  } else {
    $(".toast").remove();
    return false;
  }
  setTimeout(function() {
    $(".toast").css({
      opacity: 0,
      transition: "all .2s ease 0s"
    });
    setTimeout(function() {
      $(".toast").remove();
    }, 200);
  }, durication);
}
function add0(m) {
  return m < 10 ? "0" + m : m;
}
function getLocalTime(nS) {
  let time = new Date(nS * 1000);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return (
    y +
    "-" +
    add0(m) +
    "-" +
    add0(d) +
    " " +
    add0(h) +
    ":" +
    add0(mm) +
    ":" +
    add0(s)
  );
}
//点击预览图片
var swiper = new Swiper(".swiper-container", {
  zoom: true,
  width: window.innerWidth,
  virtual: true,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  },
  on: {
    click: function() {
      $("#origin-img").fadeOut("fast");
      this.virtual.slides.length = 0;
      this.virtual.cache = [];
      swiperStatus = false;
    }
  }
});
$(document).on("click", ".bbs_con_box img", function() {
  clickIndex = $(this).index();
  imgs = [];
  $(this)
    .parents("p")
    .find("img")
    .each(function(key, val) {
      swiper.virtual.appendSlide(
        '<div class="swiper-zoom-container"><img src="' + val.src + '" /></div>'
      );
    });
  swiper.slideTo(clickIndex);
  $("#origin-img").fadeIn("fast");
  swiperStatus = true;
});
$(".n-swiper-back").click(function() {
  $(".n-swiper").hide();
  $(".swiper-wrapper").html("");
});
