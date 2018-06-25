$(function () {
    $("#fullPageDiv").fullpage({//fullpage.js的初始配置
        verticalCentered:false,//内容不居中
        afterLoad:function(anchorLink, index){
                if(index==1){

                }
                //滚动某一屏，导航栏对应添加样式
                $(".sx_nav_ul li a").removeClass("nav_active").eq(index-1).addClass("nav_active");
         }
    });
    /*文物基本信息*/
    //导航栏跳转
    $(".sx_nav_ul li a").click(function () {
        $(".sx_nav_ul li a").removeClass("nav_active");//移除其他导航标签的选中样式
        $(this).addClass("nav_active");//当前标签添加选中样式
        var nav_item=$(this).parents("li").index();//获取被点击元素父元素的下标
        //滚动到网站的被选中对应的屏
        $.fn.fullpage.moveTo((nav_item+1), 0);//
    })
    $('#basic_info').height($(window).height()-80);
    $('.counter').countUp(); //数字滚动
    /*环境信息*/
    // 环境信息的环境场轮播
    var envSiteLen=$(".env_site_play ul li").length;
    $(".env_left_btn").click(function () {//环境场向左切换
        $(".env_site_play ul li").eq(0).appendTo($(".env_site_play ul"));
    })
    $(".env_right_btn").click(function () {//环境场向右切换
        $(".env_site_play ul li").eq(envSiteLen-1).prependTo($(".env_site_play ul"));
    })
    $(".env_site_nav a").click(function () {
        var $moveLi=$(".env_site_play ul li[li-item="+$(this).index()+"]")//获取被点中的元素相对应的场
        $moveLi.prependTo($(".env_site_play ul"));
    })
    //文物走马灯播放效果
    var show_li=$("#show_one li").length;
    $(".important_relics_show ul").css("width",show_li*(193+20)+"px");//动态设置ul的宽度
    var runNum=0;//控制容器不停移动的计数
    var runTime="";//申明一个定时器
    var runUlWidth=$(".important_relics_show ul").width();//容器ul的width
    var runLiWidth=$(".important_relics_show ul li").width();//容器li的width
    $(".important_relics_img").width(runUlWidth*2);//设置放置图片外层容器宽度
    $("#show_two").html($("#show_one").html())//复制第一个容器的所有图片,到第二个容器中
    function importantRun(){
        // 用两个同样的图片容器，当滚动一个容器宽度时，滚动距离减去该容器宽度,
        // 并将该值设置为此时的滚动初始值，达到无缝循环播放的效果
        // if($("#show_two").width()-$(".important_show_box").scrollLeft()<=0){
        //     var startRoll=$(".important_show_box").scrollLeft()-$("#show_one").width();
        //     $(".important_show_box").scrollLeft(startRoll);//重置初始滚动位置
        //     runNum=startRoll;//重置循环值
        // }else {
        //     runNum++;//每次滚动一像素
        //     $(".important_show_box").scrollLeft(runNum);
        // }
        //当元素偏移量滚动完一个容器宽度时，left值归零，达到无缝跑马灯效果
        if($("#show_one").width()-Math.abs(parseInt($(".important_relics_img").css("left")))<=0){
            runNum=0;
            $(".important_relics_img").css("left",0);
        }else{
            runNum++;
            $(".important_relics_img").css("left",-1*runNum);
        }
    }
    runTime=setInterval(importantRun,20);
    $(".important_show_box").hover(function () {//鼠标移入停止跑马灯动画
        clearInterval(runTime);
    },function () {//鼠标移除，启动跑马灯动画
        runTime=setInterval(importantRun,20);
    })
    // 创意文物信息

});
