$(function() {
  // 1.轮播图
  var picLis = $(".home-swiper .swiper-pic>ul>li");
  var circleLis = $(".home-swiper .swiper-circle>ul>li");
  var btnDiv = $(".home-swiper .swiper-btn div");
  var len = circleLis.length;
  //轮播图小圆点
  var _index = 0;
  var homeTimer = null;
  circleLis.hover(function() {
    $(this).addClass("circle-hover");
  }, function() {
    $(this).removeClass("circle-hover");
  }).click(function() {
    _index = $(this).index();
    plays();
  });
  //点击左右按钮
  btnDiv.click(function() {
    var index = $(this).index();
    if (index) {
      _index++;
      if (_index > len - 1) {
        _index = 0;
      }
      plays();
    } else {
      _index--;
      if (_index < 0) {
        _index = len - 1;
      };
      plays();
    }
  });


  function plays() {
    picLis.eq(_index).fadeIn(700).siblings("li").fadeOut(700);
    circleLis.eq(_index).addClass("circle-click").siblings("li").removeClass("circle-click");
  };
  //定时轮播

  homeTimer = setInterval(function() {
    _index++;
    if (_index > len - 1) {
      _index = 0;
    }
    plays();
  }, 4000);

  //鼠标移入时停止定时器，离开继续
  $(".home-swiper").mouseover(function() {
    clearInterval(homeTimer);
  });
  $(".home-swiper").mouseleave(function() {
    homeTimer = setInterval(function() {
      _index++;
      if (_index > len - 1) {
        _index = 0;
      }
      plays();
    }, 4000);
  });

  // 2.小米闪购
  //倒计时
  flashsaleTimer;
  countDown();

  function countDown() {
    //当天23点总毫秒数
    let nowTime = +new Date(); //当前时间总毫秒数
    let targetTime = new Date(new Date().toLocaleDateString()).getTime(); //当天00点的总毫秒数
    let overTime = new Date(new Date().toLocaleDateString()).getTime() + 18 * 60 * 60 * 1000; //当天18总毫秒数
    let readyTime = new Date(new Date().toLocaleDateString()).getTime() + 19 * 60 * 60 * 1000;
    let times = null;
    let h = null;
    let m = null;
    let s = null;
    //过当天00点活动开始
    if (targetTime <= nowTime) {
      $(".flashsale-countdown>.desc").html("距离结束还有");
      //活动结束18点，     23点距离活动开始
      if (nowTime >= overTime) {
        if (nowTime > readyTime) {
          let startTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000);
          $(".flashsale-countdown>.desc").html("距离开始还有");
          times = (startTime - nowTime) / 1000;
          count();
        } else if (nowTime < readyTime) {
          $(".flashsale-countdown>.desc").html("本场已结束");
          clearInterval(flashsaleTimer);
        } else {
          flashsaleTimer = setInterval(countDown, 1000);
        };
      } else {
        times = (overTime - nowTime) / 1000;
        count();
      };
    };



    // else {
    //     times = (targetTime - nowTime) / 1000;
    //     count();
    // };

    function count() {
      h = parseInt(times / 3600);
      h = h < 10 ? '0' + h : h;
      $(".hour").html(h);
      m = parseInt(times / 60 % 60);
      m = m < 10 ? '0' + m : m;
      $(".minute").html(m);
      s = parseInt(times % 60);
      s = s < 10 ? '0' + s : s;
      $(".second").html(s);
    }
  };
  var flashsaleTimer = setInterval(countDown, 1000);


  //轮播模块
  //滑动到按钮变色
  $(".swiper-controls span").hover(function() {
    $(this).addClass("swiper-controls-active");
  }, function() {
    $(this).removeClass("swiper-controls-active")
  });
  // 点击切换
  var moveNum = 0;
  $(".swiper-controls-r").click(function() {
    moveNum++;
    if (moveNum > 0) {
      $(".swiper-controls-l").removeClass("swiper-controls-active2");
    }
    var moveLeft = -992 * moveNum + "px";
    if (moveNum >= 5) {

      $(this).addClass("swiper-controls-active2");
      moveLeft = -992 * 5 + "px";
      moveNum = 5;
    }
    //  else {
    //     $(this).removeClass("swiper-controls-active2");
    // }
    //  else {
    //     $(this).css({
    //         "color": "#b0b0b0",
    //         "cursor": "pointer"
    //     })
    // };
    $(".flashsale-swiper>ul").animate({
      left: moveLeft
    }, "slow");
  });


  //左边按钮
  $(".swiper-controls-l").click(function() {
    moveNum--;
    if (moveNum < 5) {
      $(".swiper-controls-r").removeClass("swiper-controls-active2");
    };
    var moveLeft = -992 * moveNum + "px";
    if (moveNum <= 0) {
      $(this).addClass("swiper-controls-active2");
      moveLeft = 0 + "px";
      moveNum = 0;
    };
    $(".flashsale-swiper>ul").animate({
      left: moveLeft
    }, "slow");
  });
  //广告区域
  $(".advertising-more>ul>li").mouseenter(function() {
    $(this).addClass("advertising-active").siblings().removeClass("advertising-active");
    var moreIndex = $(this).index();
    var prh = $(this).parents(".advertising-hd").siblings(".advertising-bd").eq(moreIndex).css({
      "display": "block"
    }).siblings(".advertising-bd").css({
      "display": "none"
    });
  });


  //视频弹框   点击视频弹出视频播放
  $(".video-bd>ul>li").click(function() {
    $(".home-video-bg").css(
      "display", "block"
    );
    $(".home-video-box").animate({
      "display": "block",
      "top": "50%",
      "opacity": "1"
    }, "100").show();
    playAndPaused();
  });

  // 点击叉叉关闭视频弹框
  $(".home-video-box>.title>i").click(function() {
    $(".home-video-bg").css(
      "display", "none"
    );
    $(".home-video-box").animate({
      "display": "none",
      "top": "-1000px",
      "opacity": "0"
    }, "100");
    video[0].currentTime = 0;
    video[0].pause();
  });

  //点击视频暂停播放   再次点击继续播放
  var videoFlag = true;
  $(".video-box video").click(function() {
    if (videoFlag) {
      videoFlag = false;
      video[0].pause();
      $("#play").show();
    } else {
      videoFlag = true;
      video[0].play();
      $("#play").hide();
    }
  });

  //鼠标移入移出视频显示隐藏控制条
  $(".video-box").hover(function() {
    $(this).children(".controller").stop().slideToggle();
  }, function() {
    $(this).children(".controller").stop().slideToggle();
  });
  //视频自动播放暂停
  var video = $("#myVideo");

  function playAndPaused() {
    if (video[0].paused || video[0].ended) {
      video[0].play();
    } else {
      video[0].pause();
    };

  };

  //底部微信二维码
  $(".wx").hover(function() {
    $(".follow>img").show();
  }, function() {
    $(".follow>img").hide();
  });


  //右侧导航条显示隐藏  切换另一张图片
  $(".sidebar-right>a").hover(function() {
    $(this).children(".text").show();
    $(this).children(".pop-content").show();
    $(this).children().children(".static").hide().siblings(".hover").show();
  }, function() {
    $(this).children(".text").hide();
    $(this).children(".pop-content").hide();
    $(this).children().children(".static").show().siblings(".hover").hide();
  });

  //当document卷去的scrollTop大于770时返回顶部的按钮出现
  $(window).scroll(function() {
    var vanishTop = $(document).scrollTop();
    if (vanishTop < 800) {
      $("#go-top").css(
        "visibility", "hidden"
      );
    } else {
      $("#go-top").css(
        "visibility", "visible"
      );
    }
  });
  //点击回顶部可以返回顶部
  $("#go-top").click(function() {
    $(document).scrollTop(0);
  });
});

//窗口缩小事件  保持右侧导航栏位置
$(window).resize(function() {
  var nowWidth = $(this).width();
  if (nowWidth <= 1300) {
    $(".sidebar-right").css({
      "right": "0",
      "left": "auto",
      "margin-left": "0"
    });
  } else {
    $(".sidebar-right").css({
      "left": "50%",
      "right": "auto",
      "margin-left": "613px"
    });
  };
});