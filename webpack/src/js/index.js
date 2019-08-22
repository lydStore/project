import './main.js';
require('../css/common.less');

$(function () {
    var positionX = 0;
    var positionY = 0;

    $('.container1').mousemove(function(e) {
        var x = e.clientX, y = e.clientY;
        if(positionX === 0 && positionY === 0){
            positionX = x;
            positionY = y;
        }
        if(x > positionX && y < positionY){
            $('.p1-role1').stop().animate({'left':10,'top':10},'800',"easeOutCubic");
            $('.p1-role2').stop().animate({'right':10,'top':15},'800',"easeOutCubic");
            $('.p1-role3').stop().animate({'left':15,'bottom':10},'800',"easeOutCubic");
            $('.p1-role4').stop().animate({'right':15,'bottom':15},'800',"easeOutCubic");
            positionX = x;
            positionY = y;
        }else if(x > positionX && y > positionY){
            $('.p1-role1').stop().animate({'left':-10,'top':0},'800',"easeOutCubic");
            $('.p1-role2').stop().animate({'right':-10,'top':5},'800',"easeOutCubic");
            $('.p1-role3').stop().animate({'left':-15,'bottom':0},'800',"easeOutCubic");
            $('.p1-role4').stop().animate({'right':-15,'bottom':5},'800',"easeOutCubic");
            positionX = x;
            positionY = y;
        }else if(x < positionX && y < positionY){
            $('.p1-role1').stop().animate({'left':10,'top':10},'800',"easeOutCubic");
            $('.p1-role2').stop().animate({'right':10,'top':15},'800',"easeOutCubic");
            $('.p1-role3').stop().animate({'left':15,'bottom':10},'800',"easeOutCubic");
            $('.p1-role4').stop().animate({'right':15,'bottom':15},'800',"easeOutCubic");
            positionX = x;
            positionY = y;
        }else if(x < positionX && y > positionY){
            $('.p1-role1').stop().animate({'left':-10,'top':0},'800',"easeOutCubic");
            $('.p1-role2').stop().animate({'right':-10,'top':5},'800',"easeOutCubic");
            $('.p1-role3').stop().animate({'left':-15,'bottom':0},'800',"easeOutCubic");
            $('.p1-role4').stop().animate({'right':-15,'bottom':5},'800',"easeOutCubic");
            positionY = y;
        }

    });

    $.extend($.easing,{
        easeOutBack:function(x,t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    $('.download-now').hover(()=>{
        $('.download-code').addClass('current');
    },()=>{
        $('.download-code').removeClass('current');
    })
});

