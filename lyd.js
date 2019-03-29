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

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
