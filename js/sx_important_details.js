$(function () {
	// 达标率
    // 3D模型
    // new Vue({
    //     el: '#model_box',
    //     data: {
    //         rotation: {
    //             x: 0,
    //             y: 0,
    //             z: 0
    //         },
    //         position:{
    //             x: 0,
    //             y: 0,
    //             z: 0
    //         },
    //         scale:{
    //             x: 0.9,
    //             y: 0.9,
    //             z: 0.9
    //         },
    //         run:""
    //     },
    //     methods: {
    //         onLoad () {
    //             this.rotate();
    //         },
    //         rotate () {
    //             this.rotation.y += 0.01;
    //             this.run=requestAnimationFrame( this.rotate );
    //         },
    //         stopRotation(){
    //             cancelAnimationFrame(this.run)
    //         }
    //     }
    // })
    var standardRate = echarts.init(document.getElementById('standardRate'));
    var gaugeOption = {
        tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
		},
		series: [
			{
				name: '环境',
				center: ['50%', '55%'],
				radius: '70%',
				type: 'gauge',
				data: [{value: 0, name: '达标率'}],
				axisTick: {
					show: false
				},
				pointer: {
					width: 4
				},
				axisLine: {
					lineStyle: {
						width: 10,
						color: [[0.6, '#e83428'],[0.8, '#0d6fb8'], [1, '#14ae67']]
						// color: [[0.2, '#14ae67'], [0.8, '#0d6fb8'], [1, '#e83428']]
					}
				},
				splitLine: {
					length: 8
				},
				detail: {
					width: 48,
					height: 17,
					textStyle: {
						fontSize: 14
					},
					formatter: '{value}%',
					offsetCenter: [0, '23%']
				},
				title: {
					textStyle: {
						color: '#9fa6ac',
						fontSize: 12
					}
				}
			}
		]
    };
    setInterval(function () {
        gaugeOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        standardRate.setOption(gaugeOption, true);
    },2000);
    // 污染物
    var parameter = echarts.init(document.getElementById('parameter'));
    var radarOption = {
        title: {
            // text: '基础雷达图'
        },
        tooltip: {},
        legend: {
            // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar:[
            {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#72828d',
                        // backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '二氧化碳', max: 6500},
                    { name: '温度', max: 16000},
                    { name: '相对湿度', max: 30000},
                    { name: '有机污染物', max: 38000},
                    { name: '无机污染物', max: 52000},
                    { name: '含硫污染物', max: 25000}
                ],
                radius: 70
            }
        ],
        series: [{
            // name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            areaStyle: {
                normal: {
                    color: 'green',
                    opacity: '0.3'
                }

            },
            itemStyle: {
                normal: {
                    color: '#72828d'
                }
            },
            data : [
                {
                    value : [6500, 16000, 30000, 38000, 52000, 25000],
                    // name : '预算分配（Allocated Budget）'
                },
                {
                    value : [6500, 16000, 30000, 38000, 52000, 25000],
                    // name : '实际开销（Actual Spending）'
                }
            ]
        }]
    };
    parameter.setOption(radarOption, true);
    //相似文物跑马灯效果
    var li_num = $('.similar_relic_img').length;        //图片个数，方便计算ul宽度
    var ul_width = li_num*(192+25)+'px';
    $('.view_front').width(ul_width);                   //算出ul宽度
    $('.relic_move').width(li_num*(192+25)*2+'px');     //算出跑马灯移动栏宽度
    $('.view_behind').html($('.view_front').html());    //生成第二个ul，使移动过程中能平滑切换
    var relic_move_num = 0;
    function relic_move() {
        // console.log(Math.abs(parseInt($('.relic_move').css('left'))));
        if(Math.abs(parseInt($('.relic_move').css('left')))>=parseInt(ul_width)){
            relic_move_num = 0;                         //当移动完一个移动栏宽度后，左偏移量归零
            $('.relic_move').css('left',0);
        }else{
            relic_move_num++;                           //未移动完一个移动栏宽度，则持续移动
            $('.relic_move').css('left',-1*relic_move_num)
        }
    }
    var relic_move_time = setInterval(relic_move,20);
    $('.relic_view_box').hover(function () {
        clearInterval(relic_move_time);
    },function () {
        relic_move_time = setInterval(relic_move,20);
    })
});