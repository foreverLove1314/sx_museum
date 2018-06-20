$(function () {
    $("#fullPageDiv").fullpage({//fullpage.js的初始配置
        verticalCentered:false,//内容不居中
        afterLoad:function(anchorLink, index){
                if(index==1){

                    $('#first_page').height($(window).height());//高度自适应浏览器窗口高度
                    var li = $('#first_page .left_info .title');
                    for (var i=0;i<=li.length;i++){
                        li.eq(i).delay(i*600).animate({top:i*120+200,opacity:1},2000);
                    }
                    $('#first_page .logo').delay(3600).animate({bottom:80,opacity:1},2500);
                }
         }
    });
    // 环境信息的环境场轮播
    var envSiteLen=$("#env_site_play ul li").length;
    $(".env_left_btn").click(function () {
        $(".env_site_play ul li").eq(0).appendTo($("#env_site_play ul"))
    })
});
