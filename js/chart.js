var myCharts = echarts.init(document.getElementById('netOpinionTheme'));
option = {
    tooltip: {
        trigger: 'item'
        /*formatter: "{a} <br/>{b}: {c} ({d}%)"*/
    },
    /*legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },*/
    series: [
        {
            name:'数目',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:912, name:'专利', selected:true},
                {value:679, name:'获奖'},
                {value:1548, name:'著作'},
                {value:1242,name:'论文'},
                {value:1232,name:'项目'}
            ]
        },
        {
            name:'数目',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    /*formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',*/
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:400,name:'发明专利'},
                {value:300,name:'实用新型专利'},
                {value:212,name:'外观设计专利'},
                {value:679,name:'获奖'},
                {value:1548,name:'著作'},
                {value:372,name:'设计性论文'},
                {value:240,name:'描述性论文'},
                {value:288,name:'实验性论文'},
                {value:342,name:'理论性论文'},
                {value:1232,name:'项目'}
            ]
        }
    ]
};
myCharts.setOption(option);

$(document).ready(function () {

    $.get('json/comparison.json').done(function (data) {
        var mychart = echarts.init(document.getElementById('centerTwo'));
        var dataMap = {};
        function dataFormatter(obj) {
            var pList = ['中国科技大学','安徽大学','合肥工业大学','安徽工业大学','安徽理工大学','安徽工程大学','安徽农业大学','安徽医科大学','蚌埠医科大学','皖南医学院','安徽中医药大学','安徽师范大学','阜阳幼儿师范','安庆师范学院','淮北煤炭师范大学','黄山大学','巢湖学院','淮南师范学院','铜陵大学','安徽建筑大学','合肥学院','皖西学院','安徽财经大学','安徽科技学院','滁州学院','宿州学院','淮南联合大学','安徽医学高等专科学校','亳州学院','安徽中医药高等专科学校','安徽新华学院'];
            var temp;
            for (var year = 2002; year <= 2011; year++) {
                var max = 0;
                var sum = 0;
                temp = obj[year];
                for (var i = 0, l = temp.length; i < l; i++) {
                    max = Math.max(max, temp[i]);
                    sum += temp[i];
                    obj[year][i] = {
                        name : pList[i],
                        value : temp[i]
                    }
                }
                obj[year + 'max'] = Math.floor(max / 100) * 100;
                obj[year + 'sum'] = sum;
            }
            return obj;
        }
        console.dir(data);
        dataMap.dataThesis = dataFormatter(data.Thesis);
        dataMap.dataAward = dataFormatter(data.Award);
        dataMap.dataWork = dataFormatter(data.Work);
        dataMap.dataProject = dataFormatter(data.Project);
        dataMap.dataPatent = dataFormatter(data.Patent);
        option = {
            baseOption: {
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: 20,
                        /*handleSize: 50*/
                        zoomLock:true
                    },
                    {
                        type: 'inside',
                        start: 94,
                        end: 100
                    }
                    /*{
                        type: 'slider',
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 5,
                        height: '70%',
                        handleSize: 8,
                        showDataShadow: false,
                        left: '93%'
                    }*/
                ],
                timeline: {
                    // y: 0,
                    axisType: 'category',
                    show:false,
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 2,
                    //playInterval: 1000,
                    // controlStyle: {
                    //     position: 'left'
                    // },
                    data: [
                        '2002-01-01','2003-01-01','2004-01-01', '2005-01-01',
                        '2006-01-01', '2007-01-01','2008-01-01','2009-01-01',
                        '2010-01-01','2006-01-01'
                    ],
                    label: {
                        formatter : function(s) {
                            return (new Date(s)).getFullYear();
                        }
                    }
                },
                title: {
                    subtext: '数据来自国家统计局'
                },
                tooltip: {
                },
                legend: {
                    x: 'right',
                    data: ['论文', '著作', '专利', '获奖', '项目'],
                    selected: {
                        '获奖': false, '项目': false
                    }
                },
                calculable : true,
                grid: {
                    top: 80,
                    /*bottom: 100,*/
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return params.value.replace('\n', '');
                                }
                            }
                        }
                    }
                },
                xAxis: [
                    {
                        'type':'category',
                        'axisLabel':{'interval':0},
                        'data':data.toponymy,
                        splitLine: {show: false}
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数目'
                    }
                ],
                series: [
                    {name: '论文', type: 'bar'},
                    {name: '著作', type: 'bar'},
                    {name: '专利', type: 'bar'},
                    {name: '获奖', type: 'bar'},
                    {name: '项目', type: 'bar'},
                    {
                        name: '成果占比',
                        type: 'pie',
                        center: ['75%', '35%'],
                        radius: '28%',
                        z: 100
                    }
                ]
            },
            options: [
                {
                    title: {text: '2002全国研究成果指标'},
                    series: [
                        {data: dataMap.dataThesis['2002']},
                        {data: dataMap.dataProject['2002']},
                        {data: dataMap.dataPatent['2002']},
                        {data: dataMap.dataWork['2002']},
                        {data: dataMap.dataAward['2002']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2002sum']},
                            {name: '著作', value: dataMap.dataWork['2002sum']},
                            {name: '专利', value: dataMap.dataAward['2002sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2003全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2003']},
                        {data: dataMap.dataProject['2003']},
                        {data: dataMap.dataPatent['2003']},
                        {data: dataMap.dataWork['2003']},
                        {data: dataMap.dataAward['2003']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2003sum']},
                            {name: '著作', value: dataMap.dataWork['2003sum']},
                            {name: '专利', value: dataMap.dataAward['2003sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2004全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2004']},
                        {data: dataMap.dataProject['2004']},
                        {data: dataMap.dataPatent['2004']},
                        {data: dataMap.dataWork['2004']},
                        {data: dataMap.dataAward['2004']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2004sum']},
                            {name: '著作', value: dataMap.dataWork['2004sum']},
                            {name: '专利', value: dataMap.dataAward['2004sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2005全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2005']},
                        {data: dataMap.dataProject['2005']},
                        {data: dataMap.dataPatent['2005']},
                        {data: dataMap.dataWork['2005']},
                        {data: dataMap.dataAward['2005']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2005sum']},
                            {name: '著作', value: dataMap.dataWork['2005sum']},
                            {name: '专利', value: dataMap.dataAward['2005sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2006全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2006']},
                        {data: dataMap.dataProject['2006']},
                        {data: dataMap.dataPatent['2006']},
                        {data: dataMap.dataWork['2006']},
                        {data: dataMap.dataAward['2006']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2006sum']},
                            {name: '著作', value: dataMap.dataWork['2006sum']},
                            {name: '专利', value: dataMap.dataAward['2006sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2007全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2007']},
                        {data: dataMap.dataProject['2007']},
                        {data: dataMap.dataPatent['2007']},
                        {data: dataMap.dataWork['2007']},
                        {data: dataMap.dataAward['2007']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2007sum']},
                            {name: '著作', value: dataMap.dataWork['2007sum']},
                            {name: '专利', value: dataMap.dataAward['2007sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2008全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2008']},
                        {data: dataMap.dataProject['2008']},
                        {data: dataMap.dataPatent['2008']},
                        {data: dataMap.dataWork['2008']},
                        {data: dataMap.dataAward['2008']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2008sum']},
                            {name: '著作', value: dataMap.dataWork['2008sum']},
                            {name: '专利', value: dataMap.dataAward['2008sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2009全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2009']},
                        {data: dataMap.dataProject['2009']},
                        {data: dataMap.dataPatent['2009']},
                        {data: dataMap.dataWork['2009']},
                        {data: dataMap.dataAward['2009']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2009sum']},
                            {name: '著作', value: dataMap.dataWork['2009sum']},
                            {name: '专利', value: dataMap.dataAward['2009sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2010全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2010']},
                        {data: dataMap.dataProject['2010']},
                        {data: dataMap.dataPatent['2010']},
                        {data: dataMap.dataWork['2010']},
                        {data: dataMap.dataAward['2010']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2010sum']},
                            {name: '著作', value: dataMap.dataWork['2010sum']},
                            {name: '专利', value: dataMap.dataAward['2010sum']}
                        ]}
                    ]
                },
                {
                    title : {text: '2011全国研究成果指标'},
                    series : [
                        {data: dataMap.dataThesis['2011']},
                        {data: dataMap.dataProject['2011']},
                        {data: dataMap.dataPatent['2011']},
                        {data: dataMap.dataWork['2011']},
                        {data: dataMap.dataAward['2011']},
                        {data: [
                            {name: '论文', value: dataMap.dataPatent['2011sum']},
                            {name: '著作', value: dataMap.dataWork['2011sum']},
                            {name: '专利', value: dataMap.dataAward['2011sum']}
                        ]}
                    ]
                }
            ]
        };

        mychart.setOption(option);
    });
    $.get('json/expenditure.json').done(function (data) {
        var mychart = echarts.init(document.getElementById('expenditure'));
        console.dir(data);
        option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            }, dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 60,
                    end: 100,
                    handleSize: 10
                },
                {
                    type: 'inside',
                    start: 94,
                    end: 100
                }
                /*{
                    type: 'slider',
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 5,
                    height: '70%',
                    handleSize: 8,
                    showDataShadow: false,
                    left: '93%'
                }*/
            ],
            legend: {
                data:['论文','著作','专利','项目']
            },
            grid: {
                left: '3%',
                right: '4%',
                //bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : data.toponymy
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'论文',
                    type:'bar',
                    stack: '经费',
                    data:data.thesis
                },
                {
                    name:'专利',
                    type:'bar',
                    stack: '经费',
                    data:data.patent
                },
                {
                    name:'著作',
                    type:'bar',
                    stack: '经费',
                    data:data.work
                },
                {
                    name:'项目',
                    type:'bar',
                    stack: '经费',
                    data:data.project
                }
            ]
        };
        mychart.setOption(option);
    })
});

myCharts = echarts.init(document.getElementById('centerTwo2'));
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['成果','经费']
    },
    xAxis: [
        {
            type: 'category',
            data: ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '成果',
            min: 0,
            max: 60000,
            interval: 10000,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '经费',
            min: 0,
            max: 60000,
            interval: 10000,
            axisLabel: {
                formatter: '{value} 元'
            }
        }
    ],
    series: [
        {
            name:'成果',
            type:'bar',
            data:[20000, 39000, 40000, 43200, 45600, 56700, 13560, 16225, 32061, 20054, 54541, 33545]
        },

        {
            name:'经费',
            type:'line',
            yAxisIndex: 1,
            data:[12000, 22132, 31544, 45135, 63132, 10254, 20354, 23454, 23014, 16548, 12032, 62216]
        }
    ]
};
myCharts.setOption(option);


myCharts = echarts.init(document.getElementById('leftTwo'));
    option = {
    tooltip: {},
    legend: {
        data: ['全省', '工大','科大'],
        left:10,
        orient:'vertical'
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#231',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        radius:'60%',
        center:['55%','43%'],
        indicator: [
            { name: 'SSCI', max: 6500},
            { name: 'SCI', max: 16000},
            { name: 'EI', max: 30000},
            { name: 'CSSCI', max: 38000},
            { name: '北大核心', max: 52000},
            { name: '其他', max: 25000}
        ]
    },
    series: [{
        type: 'radar',

        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '全省'
            },
            {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '工大'
            },
            {
                value : [5123, 13000, 22000, 12000, 32000, 12000],
                name : '科大'
            }
        ]
    }]
};
myCharts.setOption(option);

