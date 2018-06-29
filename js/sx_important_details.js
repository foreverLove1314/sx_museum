$(function () {
    // 3D模型
    new Vue({
        el: '#app'
    })
	// 达标率
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
})