
	$(document).ready(function() {
	var reportChart  = echarts.init(document.getElementById('chart')); 
	var myChart = echarts.init(document.getElementById('container')); 
$.get('china.json', function (chinaJson) {
    echarts.registerMap('china', chinaJson);
	
		
var data = [
     {name: 'Beijing', value: 93},
     {name: 'Shanghai', value: 38},
     {name: 'Nanjing', value: 12},
     {name: 'Dalian', value: 10},
     {name: 'Guangzhou', value: 8},
     {name: 'Shijiazhuang', value: 5},
     {name: 'Suzhou', value: 5},
     {name: 'Chengdu', value: 5},
     {name: 'Shenyang', value: 4},
     {name: 'Qingdao', value: 4},
     {name: 'Zhengzhou', value: 4},
     {name: 'Handan', value: 3},
     {name: 'Hangzhou', value: 3},
     {name: 'Jinan', value: 3},
     {name: 'Tianjin', value: 2},
     {name: 'Xiamen', value: 2},
     {name: 'Foshan', value: 2},
     {name: 'Xian', value: 2},
     {name: 'Hengshui', value: 1},
     {name: 'Langfang', value: 1},
     {name: 'Taiyuan', value: 1},
     {name: 'Anshan', value: 1},
     {name: 'Harbin', value: 1},
     {name: 'Jiaxing', value: 1},
     {name: 'Ningbo', value: 1},
     {name: 'Hefei', value: 1},
     {name: 'Xuancheng', value: 1},
     {name: 'Fuzhou', value: 1},
     {name: 'Quanzhou', value: 1},
     {name: 'Huanggang', value: 1},
];
var geoCoordMap = {
 'Beijing':[116.1172787,39.9390731],
 'Shanghai':[121.1965695,31.2246325],
 'Nanjing':[118.4575676,32.0995425],
 'Dalian':[121.5407163,38.9299684],
 'Guangzhou':[112.9476587,39.9390731],
 'Shijiazhuang':[114.3378618,38.0076991],
 'Suzhou':[120.5042188,31.3285654],
 'Chengdu':[103.9354626,30.6587488],
 'Qingdao':[120.2247544,36.136266],
 'Zhengzhou':[113.5230941,34.7428137],
 'Handan':[114.4129925,36.6072001],
 'Hangzhou':[121.2664175,31.6108479],
 'Jinan':[116.8890305,36.6431148],
 'Tianjin':[117.0153517,39.1252291],
 'Xiamen':[118.0391672,24.4793377],
 'Foshan':[113.036268,23.0089739],
 'Xian':[108.8271254,34.2595844],
 'Hengshui':[115.5953961,37.7418783],
 'Langfang':[116.6442471,39.5193329],
 'Taiyuan':[112.4024889,37.863483],
 'Anshan':[122.9150167,41.1208032],
 'Harbin':[126.5119391,45.7573839],
 'Jiaxing':[120.6971721,30.7444575],
 'Ningbo':[121.4318767,29.8700041],
 'Hefei':[117.1461789,31.8557395],
 'Xuancheng':[118.7263293,30.9393634],
 'Fuzhou':[119.24835,26.0502974],
 'Quanzhou':[118.5136393,24.9038743],
 'Huanggang':[114.7992229,30.4527019]
};



var getDatabyProperty =function (data, property){
	var outputdata = [];
	for (var i = data.length-1; i >-1; i--) {
		outputdata.push(data[i][property]);
	}
	return outputdata;
}
var category =getDatabyProperty(data,"name");
var series =getDatabyProperty(data,"value");
option2 = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {

        data: ['直接访问'],
		textStyle: {
        color: 'white'
    }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value',
		nameTextStyle :{color: '#A0A0A3',fontSize:30},
    },
    yAxis: {
        type: 'category',
        data:category,
		axisLabel: {
                    textStyle: {
                        color: '#EDF109',
                       
                    }                    
            },
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: series
        }
    ]
};

reportChart.setOption(option2); 

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
	console.log(res.length);
    return res;
};

var convertData2 = function (data) {
    var res = [];
var _data =	data.sort(function (a, b) {
                return b.value - a.value ;
            });
    for (var i = 0; i < _data.length; i++) {
        var geoCoord = geoCoordMap[_data[i].name];
		console.log(geoCoord);
        if (geoCoord) {
	
            res.push({
                name: _data[i].name,
                value: geoCoord.concat(_data[i].value)
            });
        }else
		{
			console.log("data :"+_data[i].name);
		}
    }
	console.log(res);
    return res;
};

option = {
    backgroundColor: '#404a59',
    title: {
        text: 'Front End Stack browser report',
        subtext: 'data from Kenneth',
        sublink: 'http://www.kennethhutw.net',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['pm2.5'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series : [
        {
            name: 'pm2.5hhhh',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] ;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
        },
        {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] ;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};
myChart.setOption(option); 
  });                  
		
	window.onresize = function() {
			myChart.resize();
		};	
	});
  