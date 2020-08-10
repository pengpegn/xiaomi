$(function() {
    // 1.二维码下载app
    $(".top-download").hover(function() {
        $(this).addClass("active");
        $(".appcode").stop().slideToggle(200);
    }, function() {
        $(this).removeClass("active");
        $(".appcode").stop().slideToggle(200);
    });


    // 2.用户下拉
    $(".user").hover(function() {
        $(this).addClass("user-active");
        $(".user-wrapper").stop().slideToggle(200);
    }, function() {
        $(this).removeClass("user-active");
        $(".user-wrapper").stop().slideToggle(200);
    });

    //3.购物车
    var cartEm = $(".cart-list>li em");

    var cartI = cartEm.siblings("i");
    getSum();

    //鼠标移动到购物车滑上滑下
    $(".cart-box").hover(function() {
        $(".cart-mini").addClass("cart-active");
        $(".cart-menu").stop().slideDown(300);
    }, function() {
        $(".cart-mini").removeClass("cart-active");
        $(".cart-menu").stop().slideUp(300);
    });
    //点击叉叉删除li   然后调用计算函数重新计算
    $(".cart-list").on("click", ".goods-del", function() {
        var goodsNum = $(this).siblings(".goods-price").children("i");
        if (parseFloat(goodsNum.html()) <= 1) {
            $(this).parent().remove();
            goodsNum.html(0);
        } else {
            goodsNum.html(parseFloat(goodsNum.html()) - 1);
        };
        getSum();
    });
    //计算和显示总数量和总价
    function getSum() {
        // 总价
        var money = 0;
        // 数量
        var count = 0;

        cartEm.each(function(index, item) {
            money += (parseFloat($(item).html()) * parseFloat($(cartI[index]).html()));
            count += parseFloat($(cartI[index]).html());
        });
        $(".total-money em").html(money);
        $(".total-price i").html(count);
        $(".cart-num i").html(count);
    };

    // 4.导航
    //导航条滑动显示隐藏
    $(".nav-list>li").hover(function() {
        $(this).addClass("nav-item-active");
    }, function() {
        $(this).removeClass("nav-item-active");
    });
    $(".n-i-p").hover(function() {
        var index = $(this).index();
        $(".nav-item-product").stop().slideDown(100);
        $(".nav-item-product ul").eq(index - 1).show().siblings().hide();
    }, function() {
        $(".nav-item-product").stop().slideUp(100);
    })
    $(".nav-item-product").hover(function() {
        $(this).stop().slideDown();
    }, function() {
        $(this).stop().slideUp();
    });
    //导航搜索
    $(".search-text").focus(function() {
        $(".header-search").addClass("search-focus");
        $(".keyword-list").show();
    });
    $(".search-text").blur(function() {
        $(".header-search").removeClass("search-focus");
        $(".keyword-list").hide();
    });
    //5.导航分类的二级导航
    $(".category-item").hover(function() {
        $(this).children(".category-children").show();
    }, function() {
        $(this).children(".category-children").hide();
    })
})