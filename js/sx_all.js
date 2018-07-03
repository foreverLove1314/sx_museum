$(function () {
    $("#fullPageDiv").fullpage({//fullpage.js的初始配置
        paddingTop: '100px',//顶部100px内间距
        verticalCentered:false,//内容不居中
        afterLoad:function(anchorLink, index){

                if(index==1){
                    $('.counter').countUp();
                } else if(index==3){
                    $('.counter_roll').countUp();//数字滚动
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
    //高度自适应窗口高度
    $('#basic_info').height($(window).height()-80);
    $('.counter').countUp();//数字滚动
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
        $.fn.fullpage.setAllowScrolling(false);//禁止页面滚动
        var video_index = $(this).parents('li').index();
        $('.video_play_mask').fadeIn(1000);
        $('.video_play_container .video video .plyr .plyr__play-large').show();
        $('.video_play_container .video video').attr('src',video_src[video_index]);
    });
    $('.video_close').click(function () {
        $.fn.fullpage.setAllowScrolling(true);//启用页面滚动
        $('.video_play_mask').hide();
        window.location.reload();
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
    var liItem=0;//表示当前显示环境场的下标，默认第一个
    var envSiteLen=$(".env_site_play ul li").length;
    $(".env_left_btn").click(function () {//环境场向左切换
        liItem++;
        if(liItem==4){
            liItem=0;
        }
        $(".env_site_play ul").css("left",-liItem*100+"%");
        $(".env_site_nav a").css("color","#b6b6b6");//还原下方文字的字体颜色
        $(".env_site_nav a").eq(liItem).css("color","#ffffff");//添加对应焦点文字的样式
    });
    $(".env_right_btn").click(function () {//环境场向右切换
        liItem--;
        if(liItem==-1){
            liItem=3;
        }
        $(".env_site_play ul").css("left",-liItem*100+"%");
        $(".env_site_nav a").css("color","#b6b6b6");//还原下方文字的字体颜色
        $(".env_site_nav a").eq(liItem).css("color","#ffffff");//添加对应焦点文字的样式
    });
    $(".env_site_nav a").click(function () {
        liItem=$(this).index();//获取被点中的元素相对应的场
        $(".env_site_play ul").css("left",-liItem*100+"%");
        $(".env_site_nav a").css("color","#b6b6b6");
        $(this).css("color","#ffffff");
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
    // 视频播放
    // var videoObj = videojs("videoId");
    $(".popup_btn").click(function () {//点击播放按钮时，视频弹出
        $.fn.fullpage.setAllowScrolling(false);//禁止页面滚动
        $(".sx_nav").css("z-index",0);//设置导航栏层级
        // $(this).parents(".videoOutBox").appendTo(".video_play_box");//移动被点击的视频
        $(".model_div").css("display","block");//显示背景弹出层
        $(this).parents(".videoOutBox").addClass("videoContent");//外层容器添加弹出样式
        $(this).css("display","none");//隐藏弹出按钮
    });
    $(".model_div").click(function () {
        $.fn.fullpage.setAllowScrolling(true);//启用页面滚动
        $(this).css("display","none");//点击弹出层，关闭弹出状态
        $(".sx_nav").css("z-index",999);//设置导航栏层级
        $(".videoOutBox").removeClass("videoContent");//外层容器移除弹出样式
        $(".popup_btn").css("display","block");//显示弹出按钮
        $(".videoBox video").each(function () {//停止播放视频
            var videoId=videojs($(this).attr("id"));
            videoId.pause();
        })
    });
    // 热力场
});
