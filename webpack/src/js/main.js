require("expose-loader?$!jquery");
import Fullpage from  'fullpage.js';
let staticData = {
     appId:316,
     baseUrl:process.env.NODE_ENV === 'development'?'/api':'http://adapiv2.srccwl.com',
     exp:{
         mobile:/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,//验证手机号
     },
    client:function () {
        let u = navigator.userAgent, app = navigator.appVersion;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            return 4;
        }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            return 3;
        }else{
            return 1;
        }
    }
};
let methods = {
    tab:function (obj) {
        let hdList = $(obj).parents('.o-tab-role'),
            bdList = $('.o-tab-list'),
            index = hdList.attr('data-index');
        if(index==="5")return;
        hdList.addClass('current').siblings().removeClass('current');
        if(staticData.client()===4){
            bdList.eq(index).show().siblings('.o-tab-list').hide();
        }else{
            bdList.eq(index).stop().fadeIn().siblings('.o-tab-list').stop().hide();
        }
    },
    yellowTab:function (obj) {
        let hdList = $(obj),
            bdList = $('.y-tab-list'),
            index = hdList.index();
        hdList.addClass('current').siblings().removeClass('current');
        bdList.eq(index).stop().fadeIn(200).siblings('.y-tab-list').stop().hide();
    },
    dialog:{
        toast:function (msg) {
            $('.o-dialog-msg').show();
            $('.dialog-msg span').text(msg);
        }
    },
    request:{
        post:function (url, params, callback) {
            $.ajax({
                url: staticData.baseUrl+url,
                data: params,
                dataType: 'json',
                type: "POST",
                success: function (res) {
                    if (res.ret === 0) {
                        return callback(res);
                    }  else {
                        methods.dialog.toast(res.msg);
                    }
                },
                error: function (err) {
                    methods.dialog.toast(err.msg);
                }
            });
        },
        // 预约发送验证码
        sendCode: function (obj) {
            const mobile = $('.mobile').val();
            const params = {
                mobile: mobile,
                appid:staticData.appId
            };
            if ( !staticData.exp.mobile.test(mobile) ) {
                methods.dialog.toast('请输入正确的手机号码');
                return false;
            }
            this.post('/appointment/sendCode', params, function (res) {
                methods.request.setTime(obj);
            })
        },
        // 发送验证码 倒计时
        setTime: function (obj) {
            let time = 60;
            let timer = setInterval(function () {
                if (time <= 0) {
                    clearInterval(timer);
                    $(obj).text('获取验证码').attr('disabled', false);
                } else {
                    time--;
                    $(obj).text(time + ' S').attr('disabled', true);
                }
            }, 1000);
        },
        // 预约
        order:function () {
            let selectMode = $('.select-mode .current'),
                mobile   = $('.mobile').val(),
                  code   = $('.code').val(),
                  plat   = selectMode.attr('data-plat'),
                client   = selectMode.attr('data-client'),
                  params = {
                      mobile: mobile,
                      code:code,
                      platform_id:plat,
                      client_type:staticData.client,
                      source_from:'aldv2_web',
                      appid:staticData.appId
                  };
            if ( !staticData.exp.mobile.test(mobile)) {
                methods.dialog.toast('请输入正确的手机号码');
                return false;
            }
            if (!code || code === '') {
                methods.dialog.toast('请输入验证码');
                return false;
            } else if (code && code.length !== 6) {
                methods.dialog.toast('验证码必须为六位数字');
                return false;
            }
            this.post('/appointment/submit', params, function (res) {
                $('.dialog-title span').text(res.data.num);
                $('.o-dialog-suc').show();
                $('.o-dialog-order').hide();
            })
        },
        //获取预约人数
        getNum:function () {
            this.post('/appointment/getAppointmentNum',{appid:staticData.appId},function (res) {
                if(res.ret===0){
                    $('.dialog-title span,.order-num span').text(res.data.num);
                }
            })
        }
    }
};
window.methods = methods;
$(function () {
    new Fullpage('#fullpage', {
        loopBottom: false
    });
    //tab
    $('.o-tab-hd a').click(function () {
        methods.tab(this);
    });
    $('.o-tab-hd a').hover(function () {
        methods.tab(this);
    });
    $('.y-tab-hd li').click(function () {
        methods.yellowTab(this);
    });
    $('.y-tab-hd li').hover(function () {
        methods.yellowTab(this);
    });
    //预约弹窗
    $('.order-now-btn').click(function () {
        $('.o-dialog-order').show();
        methods.request.getNum();
    });
    //关闭弹窗
    $('.o-close,.btn-sure').click(function () {
        $(this).parents('.o-dialog').hide();
    });
    //选择系统
    $('.select-mode a').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
    });
    //发送验证码
    $('.get-code').click(function () {
        methods.request.sendCode(this);
    });
    //立即预约
    $('.order-now').click(function () {
        methods.request.order();
    })
});
