$(function () {
    $("#fullPageDiv").fullpage({//fullpage.js的初始配置
        verticalCentered:false,//内容不居中
        afterLoad:function(anchorLink, index){
                if(index==1){

                }
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
    var show_li=$(".important_relics_show ul li").length;
    $(".important_relics_show ul").css("width",show_li*(193+20)+"px");
    var runNum=0;//控制容器不停移动的计数
    var runTime="";//申明一个定时器
    var runUlWidth=$(".important_relics_show ul").width();//容器ul的width
    var runLiWidth=$(".important_relics_show ul li").width();//容器li的width
    function importantRun(){
        runNum++;
        $(".important_relics_img ul").css({"left":(-1*runNum)+"px"})
        if(Math.abs(runNum)%(runLiWidth+40)==0){
            // $(".important_relics_img ul").css("left",0);
            $(".important_relics_show ul").append($(".important_relics_show ul li").eq(0));
            $(".important_relics_show ul li").eq(0).remove();
            runNum=0;
        }
    }
    runTime=setInterval(importantRun,50);
});
