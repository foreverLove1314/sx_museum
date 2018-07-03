$(function () {
    $("#fullPageDiv").fullpage({//fullpage.js的初始配置
        paddingTop: '100px',//顶部100px内间距
        verticalCentered:false,//内容不居中
        afterLoad:function(anchorLink, index){
                if(index==1){

                }
                if(index==3){

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
    });
    //数字滚动
    $('.counter').counterUp();
    //特展人流量
    var my_echarts = $('.basic_info_middle .right .content');
    my_echarts.width($('.basic_info_middle .right').width()*1);
    my_echarts.height($('.basic_info_middle .right').height()*0.61);
    var page_num= 1;
    //下一页
    $('#next_page').click(function () {
        page_num++;
        $('#page_num').html(page_num);      //显示当前页码
        for(var i=0;i<3;i++){
            my_echarts.eq(i).hide();         //隐藏所有echarts
        }
        my_echarts.eq(page_num-1).show();    //显示当前echarts
        $('#last_page').show();             //显示上一页按钮
        if(page_num>=3){
            page_num=3;
            $('#page_num').html(page_num);  //如果页数大于3，则一直为3，并重置当前显示页码
            $(this).hide();                 //下一页按钮隐藏
        }
    });
    //视频
    var video_src =['../video/video1.mp4','../video/video2.mp4','../video/video1.mp4','../video/video2.mp4'];
    var video_play =$('.basic_info_bottom ul li img');
    video_play.click(function () {
        $.fn.fullpage.setAllowScrolling(false);             //禁止页面滚动
        var index = $(this).parents('li').index();
        $('.video_play_mask').fadeIn(1000);
        //在容器中添加<video>及播放插件相关方法
        $('.video_play_container .video').append('<video></video>'+ '<script>plyr.setup();</script>');
        $('.video_play_container .video video').attr('src',video_src[index]);  //播放对应的视频
    });
    $('.video_close').click(function () {
        $.fn.fullpage.setAllowScrolling(true);      //启用页面滚动
        $('.video_play_mask').hide();
        $('.video_play_container .video').empty();  //移除div类名为video所有子节点,相当于重置video
    });
    //上一页
    $('#last_page').click(function () {
        page_num--;
        $('#page_num').html(page_num);
        for(var i=0;i<3;i++){
            my_echarts.eq(i).hide();
        }
        my_echarts.eq(page_num-1).show();
        $('#next_page').show();
        if(page_num<=1){
            page_num=1;
            $('#page_num').html(page_num);
            $(this).hide();
        }
    });
    /*环境信息*/
    // 环境信息的环境场轮播
    var envSiteLen=$(".env_site_play ul li").length;
    $(".env_left_btn").click(function () {//环境场向左切换
        $(".env_site_play ul li").eq(0).appendTo($(".env_site_play ul"));
    });
    $(".env_right_btn").click(function () {//环境场向右切换
        $(".env_site_play ul li").eq(envSiteLen-1).prependTo($(".env_site_play ul"));
    });
    $(".env_site_nav a").click(function () {
        var $moveLi=$(".env_site_play ul li[li-item="+$(this).index()+"]")//获取被点中的元素相对应的场
        $moveLi.prependTo($(".env_site_play ul"));
    });
    //文物走马灯播放效果
    var show_li=$("#show_one li").length;
    $(".important_relics_show ul").css("width",show_li*(193+20)+"px");//动态设置ul的宽度
    var runNum=0;//控制容器不停移动的计数
    var runTime="";//申明一个定时器
    var runUlWidth=$(".important_relics_show ul").width();//容器ul的width
    $(".important_relics_img").width(runUlWidth*2);//设置放置图片外层容器宽度
    $("#show_two").html($("#show_one").html())//复制第一个容器的所有图片,到第二个容器中
    function importantRun(){
        //当元素偏移量滚动完一个容器宽度时，left值归零，达到无缝跑马灯效果
        if($("#show_one").width()-Math.abs(parseInt($(".important_relics_img").css("left")))<=0){
            runNum=0;
            $(".important_relics_img").css("left",0);
        }else{
            runNum++;
            $(".important_relics_img").css("left",-1*runNum);
        }
    };
    runTime=setInterval(importantRun,20);
    $(".important_show_box").hover(function () {//鼠标移入停止跑马灯动画
        clearInterval(runTime);
    },function () {//鼠标移除，启动跑马灯动画
        runTime=setInterval(importantRun,20);
    });
    /*重点文物信息*/
    //修复进度完成显示
    var total_width = $('.important_relics_info .schedule_bg').width();
    $('.important_relics_info .schedule').each(function () {
        if($(this).width()==total_width){
            $(this).next('i').show();           //宽度达到100%，当前的下一个元素(i标签)显示，i标签默认隐藏
        }else{
            $(this).next('i').hide();
        }
    });
    // 创意文物信息
    // 视频播放，同文物基本信息的视频播放
    var creative_video_src =['../video/video1.mp4','../video/video2.mp4'];
    var creative_video_play =$('.creative_video_play');
    creative_video_play.click(function () {
        $.fn.fullpage.setAllowScrolling(false);
        var index = $(this).parents('.creative_video').index();
        $('.video_play_mask').fadeIn(1000);
        //在容器中添加<video>及播放插件相关方法
        $('.video_play_container .video').append('<video></video>'+ '<script>plyr.setup();</script>');
        //父级元素‘.creative_video’的同胞有3个，因此最后的index减1
        $('.video_play_container .video video').attr('src',creative_video_src[index-1]);
    });
    $('.video_close').click(function () {
        $.fn.fullpage.setAllowScrolling(true);
        $('.video_play_mask').hide();
        $('.video_play_container .video').empty();
    });
});
