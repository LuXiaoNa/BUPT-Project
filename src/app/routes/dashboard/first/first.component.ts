import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
import {environment} from "@env/environment";
import 'echarts/map/js/china.js';


@Component({
  selector: 'app-dashboard-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFirstComponent implements OnInit {
  //影响警告分布数据图
   notHandleNum:number;
   handledNum:number;
   threatNum:number;
/*  aletDistributeSelect:any;*/
  //影响警告分布数据图单选框数据
/*  aletDistributeOptions=[];*/
  //影响捕获报文数据图
  AaptureOption:any;
  //影响捕获报文数据图选框数据
  AaptureMessageSelect:any;
  //影响捕获报文数据图选框数据源
  AaptureMessageOptions=[];
  //影响检测流量数据图
  FlowOption:any;
  //影响检测流量数据图单选框数据
  DetectFlowSelect:any;
  //影响检测流量数据图选框数据源
  DetectFlowOptions=[];
  //威胁
  threatenSelect:any;
  //影响威胁单选框数据
  threatenOptions=[];
  time:string;
  srcIP:string;
  desIP:string;
  type:string;
  info:string;
  //ip排名选框数据
  TopOptions=[
    {id:10,name:'Top10'},
    {id:5,name:'Top5'},
    {id:3,name:'Top3'}
  ];
  DnsTopOptions=[
    {id:10,name:'Top10'},
    {id:5,name:'Top5'},
    {id:3,name:'Top3'}
  ];
  //木马IP统计数据图
  TopSelect:any;
  //DNSIP统计数据图
  DnsTopSelect:any;
  IPOption:any;
  DnsIPOption:any;
  constructor(
    private http: _HttpClient
  ) {}
  ngOnInit() {
    this.aletDistributeSet();
    // 时间对象定义
    const timer = [
      { id: 1, name: '5分钟' },
      { id: 2, name: '1小时' },
      { id: 3, name: '24小时' },
     /* { id: 4, name: '最近7天' },*/
    ];
   /* this.pageIndex=1;
    this.pageSize=10;
    this.total=0;*/
    this.TopSelect = 10;
    this.DnsTopSelect=10;
    //设置警告图表单选框初始值
    this.optionSet(timer);
    this.AaptureMessageSet();
    this.DetectFlowSet();
    this.getDns();
    this.getThrenOption();
    this.getDitu();
  }
  Option:any;

/*  getDitu(){
   let Data = [{
      name: '江苏省',
      value: 15.3
    },
      {
        name: '北京市',
        value: 3.8
      },
      {
        name: '上海',
        value: 4.6
      },
      {
        name: '重庆',
        value: 3.6
      },
      {
        name: '河北',
        value: 3.4
      },
      {
        name: '河南',
        value: 3.2
      },
      {
        name: '云南',
        value: 1.6
      },
      {
        name: '辽宁',
        value: 4.3
      },
      {
        name: '黑龙江',
        value: 4.1
      },
      {
        name: '湖南',
        value: 2.4
      },
      {
        name: '安徽',
        value: 3.3
      },
      {
        name: '山东',
        value: 3.0
      },
      {
        name: '新疆',
        value: 1
      },
      {
        name: '江苏',
        value: 3.9
      },
      {
        name: '浙江',
        value: 3.5
      },
      {
        name: '江西',
        value: 2.0
      },
      {
        name: '湖北',
        value: 2.1
      },
      {
        name: '广西',
        value: 3.0
      },
      {
        name: '甘肃',
        value: 1.2
      },
      {
        name: '山西',
        value: 3.2
      },
      {
        name: '内蒙古',
        value: 3.5
      },
      {
        name: '陕西',
        value: 2.5
      },
      {
        name: '吉林',
        value: 4.5
      },
      {
        name: '福建',
        value: 2.8
      },
      {
        name: '贵州',
        value: 1.8
      },
      {
        name: '广东',
        value: 3.7
      },
      {
        name: '青海',
        value: 0.6
      },
      {
        name: '西藏',
        value: 0.4
      },
      {
        name: '四川',
        value: 3.3
      },
      {
        name: '宁夏',
        value: 0.8
      },
      {
        name: '海南',
        value: 1.9
      },
      {
        name: '台湾',
        value: 0.1
      },
      {
        name: '香港',
        value: 0.1
      },
      {
        name: '澳门',
        value: 0.1
      }
    ];
  let  yData = [];
  let  barData = [];
 this.Option = {
      title: [{
        show: true,
        text: '排名情况',
        textStyle: {
          color: '#2D3E53',
          fontSize: 18
        },
        right: 180,
        top: 100
      }],
      tooltip: {
        show: true,
        formatter: function (params) {
          return params.name + '：' + params.data['value'] + '%';
        },
      },
      visualMap: {
        type: 'continuous',
        orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 80,
        text: ['高', '低'],
        showLabel: true,
        seriesIndex: [0],
        min: 0,
        max: 2,
        inRange: {
          color: ['#6FCF6A', '#FFFD64', '#FF5000']
        },
        textStyle: {
          color: '#7B93A7'
        },
        bottom: 30,
        left: 'left',
      },
      grid: {
        right: 10,
        top: 135,
        bottom: 100,
        width: '20%'
      },
      xAxis: {
        show: false
      },
      yAxis: {
        type: 'category',
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          interval: 0,
          margin: 85,
          textStyle: {
            color: '#455A74',
            align: 'left',
            fontSize: 14
          },
          rich: {
            a: {
              color: '#fff',
              backgroundColor: '#FAAA39',
              width: 20,
              height: 20,
              align: 'center',
              borderRadius: 2
            },
            b: {
              color: '#fff',
              backgroundColor: '#4197FD',
              width: 20,
              height: 20,
              align: 'center',
              borderRadius: 2
            }
          },
          formatter: function (params) {
            if (parseInt(params.slice(0, 1)) < 3) {
              return [
                '{a|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
              ].join('\n');
            } else {
              return [
                '{b|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
              ].join('\n');
            }
          }
        },
        data: yData
      },
      geo: {
        // roam: true,
        map: 'china',
        left: 'left',
        right: '300',
        // layoutSize: '80%',
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            areaColor: '#fff464'
          }
        }
      },
      series: [{
        name: 'mapSer',
        type: 'map',
        roam: false,
        geoIndex: 0,
        label: {
          show: false,
        },
        data: Data
      }, {
        name: 'barSer',
        type: 'bar',
        roam: false,
        visualMap: false,
        zlevel: 2,
        barMaxWidth: 8,
        barGap: 0,
        itemStyle: {
          normal: {
            color: function (params) {
              // build a color map as your need.
              var colorList = [{
                colorStops: [{
                  offset: 0,
                  color: '#FFD119' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#FFAC4C' // 100% 处的颜色
                }]
              },
                {
                  colorStops: [{
                    offset: 0,
                    color: '#00C0FA' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#2F95FA' // 100% 处的颜色
                  }]
                }
              ];
              if (params.dataIndex < 3) {
                return colorList[0];
              } else {
                return colorList[1];
              }
            },
            barBorderRadius: 15
          }
        },
        data: barData
      }]
    };
    for (var i = 0; i < 10; i++) {
      barData.push( Data[i]);
      yData.push(i +  Data[i].name);
    }
    // 初始化对象
    const echarts = this.nes.echarts;
    // 获取广东地图的json文件
    this.http.get('assets/json/china.json').subscribe(geoJson => {
        var myChart = echarts.init(document.getElementById('chinaMap'));
        // 注册地图
        echarts.registerMap('中国', geoJson);
        myChart.setOption(
          // js中不需要加 echarts.
          echarts.Option = this.Option
        );
      },
      error1 => {
        console.log(error1);
      },
      () => {
        console.log('初始化地图已完成。');
      }
    );
  }*/
  getDitu(){
    this.Option = {
      title : {
        text: 'IP攻击实施监控',
        subtext: '',
        left: 'center',
        textStyle: {
          color: '#d6e4ff',
          fontSize: '28',
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: function (val) {
          return `攻击情况：<br>${val.data.name}：${val.data.value}%<br>攻击IP：${val.data.warn}<br>攻击次数：${val.data.problem}`;
        }
      },
      visualMap: {
      /*  min: 0,
        max: 100,
        left: 'left',
        top: 'bottom',
        text:['高','低'],  */         // 文本，默认为数值文本
        calculable : true,
        inRange: {
          color: ['#feffc7', '#02cb00']
        }
      },
      series : [
        {
          name: '项目进度',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            color: 'red',
            areaColor: '#5CACEE',
          },
          emphasis: {
            itemStyle: {
              areaColor: '#f9ba09'
            }
          },
          data:[
            {name: '北京',value: Math.round(Math.random()*100),warn: 10,problem: 12},
            {name: '天津',value: Math.round(Math.random()*100),warn: 10,problem: 12},
            {name: '上海',value: Math.round(Math.random()*100),warn: 10,problem: 12},
            {name: '重庆',value: Math.round(Math.random()*100),warn: 10,problem: 12},
            {name: '河北',value: Math.round(Math.random()*100)},
            {name: '河南',value: Math.round(Math.random()*100)},
            {name: '云南',value: Math.round(Math.random()*100)},
            {name: '辽宁',value: Math.round(Math.random()*100)},
            {name: '黑龙江',value: Math.round(Math.random()*100)},
            {name: '湖南',value: Math.round(Math.random()*100)},
            {name: '安徽',value: Math.round(Math.random()*100)},
            {name: '山东',value: Math.round(Math.random()*100)},
            {name: '新疆',value: Math.round(Math.random()*100)},
            {name: '江苏',value: Math.round(Math.random()*100)},
            {name: '浙江',value: Math.round(Math.random()*100)},
            {name: '江西',value: Math.round(Math.random()*100)},
            {name: '湖北',value: Math.round(Math.random()*100)},
            {name: '广西',value: Math.round(Math.random()*100)},
            {name: '甘肃',value: Math.round(Math.random()*100)},
            {name: '山西',value: Math.round(Math.random()*100)},
            {name: '内蒙古',value: Math.round(Math.random()*100)},
            {name: '陕西',value: Math.round(Math.random()*100)},
            {name: '吉林',value: Math.round(Math.random()*100)},
            {name: '福建',value: Math.round(Math.random()*100)},
            {name: '贵州',value: Math.round(Math.random()*100)},
            {name: '广东',value: Math.round(Math.random()*100)},
            {name: '青海',value: Math.round(Math.random()*100)},
            {name: '西藏',value: Math.round(Math.random()*100)},
            {name: '四川',value: Math.round(Math.random()*100)},
            {name: '宁夏',value: Math.round(Math.random()*100)},
            {name: '海南',value: Math.round(Math.random()*100)},
            // {name: '台湾',value: Math.round(Math.random()*100)},
            {name: '香港',value: Math.round(Math.random()*100)},
            {name: '澳门',value: Math.round(Math.random()*100)}
          ]
        }
      ]
    };
  }

  optionSet(timer){
    this.AaptureMessageOptions = timer;
    this.DetectFlowOptions = timer;
    this.threatenOptions = timer;
    this.AaptureMessageSelect = 3;
    this.DetectFlowSelect = 3;
    this.threatenSelect = 3;
  }

  timeSet(timer) {
    let stime;
    switch (timer) {
      case 1:
        stime = moment().subtract(5, 'minutes');
        break;
      case 2:
        stime = moment().subtract(1, 'hours');
        break;
      case 3:
        stime = moment().subtract(1, 'days');
        break;
   /*   case 4:
        stime = moment().subtract(7, 'days');
        break;*/
    }
    return {
      stime: stime['_d'].getTime()
    };
  }
  //获取警告数据
  aletDistributeSet(){
    this.http.get(environment.PUBLIC_URL+'/info/threatNum').subscribe((req:any[])=>{
      if(req['data']!=null){
        this.notHandleNum=req['data'][0]['notHandleNum'];
        this.handledNum=req['data'][0]['handledNum'];
        this.threatNum=req['data'][0]['threatNum'];
      }
    });
  }
/*  报文图描绘*/
  AaptureDraw(data){
    if(data.length === 0){
      this.AaptureOption={};
    }else{
      let yAaptureData=[];
      let xAaptureData=[];
      for (let i=data.length-1;i>-1;i--){
        yAaptureData.push(data[i]['packageNum']/10000);
        let day=moment(Number(data[i]['time'])).format('MM-DD HH:mm:ss');
        xAaptureData.push(day);
      }
      this.AaptureOption = {
        tooltip: {
          trigger: 'axis',
        },
        color: ['#8DEEEE'],
        xAxis: {
          type: 'category',
          data: xAaptureData,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(55,255,249,1)',
            }
          },
          axisLabel: {
            color: 'rgba(55,255,249,1)'
          }
        },
        yAxis: {
          name: '数量(万)',
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(55,255,249,1)',
            }
          }
       },
        series: [
          {
            symbol: 'none',
            data: yAaptureData,
            type: 'line',
            areaStyle: { color: ['#8DEEEE'] },
          },
        ],
      };
    }
  }
  //获取报文数据
  AaptureMessageSet(){
    let time = this.timeSet(this.AaptureMessageSelect);
    let params={
      time:time.stime,
    };
    this.http.get(environment.PUBLIC_URL+'/info/packageNum',params).subscribe((req:any[])=>{
      let data;
      if(req['data']!=null){
        data = req['data'];
      }else{
        data = [];
      }
      this.AaptureDraw(data);
    });
  }
  //检测流量绘图
  DetectFlowDraw(data){
    if(data.lenght === 0){
      this.FlowOption={}
    }else{
      let yDetectFlowData=[];
      let xDetectFlowData=[];
      for (let i=data.length-1;i>-1;i--){
        yDetectFlowData.push(data[i]['flowNum']/1048576);
        let day=moment(Number(data[i]['time'])).format('MM-DD HH:mm:ss');
        xDetectFlowData.push(day);
      }
      this.FlowOption={
        tooltip: {
          trigger: 'axis',
        },
        color: ['#EE7942'],
        xAxis: {
          type: 'category',
          data: xDetectFlowData,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#EE7942',
            }
          },
          axisLabel: {
            color: '#EE7942'
          },
        },
        yAxis: {
          name: '流量(M)',
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#EE7942',
            }
          }
        },
        series: [
          {
            symbol: 'none',
            data: yDetectFlowData,
            type: 'line',
            areaStyle: { color: ['#EE7942'] },
          },
        ],
      }
    }
  }
  //获取检测流量数据
  DetectFlowSet(){
    let time = this.timeSet(this.DetectFlowSelect);
    let params={
      time:time.stime,
    };
    this.http.get(environment.PUBLIC_URL+'/info/flowNum',params).subscribe((req:any[])=>{
      let data;
      if(req['data']!=null){
        data=req['data'];
      }else{
        data=[];
      }
      this.DetectFlowDraw(data);
    });
  }
  //域名威胁等级
  DnsOption:any;
  getDns(){
    this.http.get(environment.PUBLIC_URL+'/info/threatLevel').subscribe((req:any[])=> {
      if (req['data'] != null) {
        let xData = [];
        let yData = [];
        for (let i = 0; i < req['data'].length; i++) {
          xData.push(req['data'][i]['dangerLevel']);
          yData.push(req['data'][i]['pencent'])
        }
        this.DnsOption = {
        /*  backgroundColor: '#333',*/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['可以忽略','一般','值得注意','危险','十分危险'],
            textStyle: {
              color: '#fff',
              fontSize: 14,
              fontFamily: 'PingFangSC',
              fontWeight: 400
            }
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              center: ['55%', '53%'],
              radius: ['0', '110'],
              selectedMode: 'single',
              selectedOffset: 30,
              clockwise: true,
              itemStyle: {
                borderColor: '#04192b',
                borderWidth: 1
              },
              label: {
                normal: {
                  show: true,
                  formatter: (params)=>{
                    return '{color'+params.dataIndex+'| '+params.percent+'%}'
                  },
                  rich: {
                    color0: {
                      fontSize: 18,
                      color: '#EBE806',
                      fontWeight: 400,
                      fontFamily: 'PingFangSC'
                    },
                    color1: {
                      fontSize: 18,
                      color: '#ca8622',
                      fontWeight: 400,
                      fontFamily: 'PingFangSC'
                    },
                    color2: {
                      fontSize: 18,
                      color: '#5EA6FE',
                      fontWeight: 400,
                      fontFamily: 'PingFangSC'
                    },
                    color3: {
                      fontSize: 18,
                      color: '#37FFF9',
                      fontWeight: 400,
                      fontFamily: 'PingFangSC'
                    },
                    color4: {
                      fontSize: 18,
                      color: '#FF5624',
                      fontWeight: 400,
                      fontFamily: 'PingFangSC'
                    }
                  }
                }
              },
              labelLine: {
                length: 24
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data:[
                {
                  value:yData[0], name:'可以忽略',
                  itemStyle: {
                    color: {
                      type: 'radial',
                      x: 550,
                      y: 440,
                      r: 120,
                      colorStops: [{
                        offset: 0, color: 'rgba(235,232,6, 0.2)' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#EBE806' // 100% 处的颜色
                      }],
                      global: true // 缺省为 false
                    }
                  },
                  labelLine: {
                    lineStyle: {
                      color: '#EBE806'
                    }
                  }
                },
                {
                  value:yData[1], name:'一般',
                  itemStyle: {
                    color: {
                      type: 'radial',
                      x: 550,
                      y: 440,
                      r: 120,
                      colorStops: [{
                        offset: 0, color: 'rgba(255,86,36, 0.2)' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ca8622' // 100% 处的颜色
                      }],
                      global: true // 缺省为 false
                    }
                  },
                  labelLine: {
                    lineStyle: {
                      color:'#ca8622'
                    }
                  }
                },
                {
                  value:yData[2], name:'值得注意',
                  itemStyle: {
                    color: {
                      type: 'radial',
                      x: 550,
                      y: 440,
                      r: 120,
                      colorStops: [{
                        offset: 0, color: 'rgba(94,166,254, 0.2)' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#5EA6FE' // 100% 处的颜色
                      }],
                      global: true // 缺省为 false
                    }
                  },
                  labelLine: {
                    lineStyle: {
                      color: '#5EA6FE'
                    }
                  }
                },
                {
                  value:yData[3], name:'危险',
                  itemStyle: {
                    color: {
                      type: 'radial',
                      x: 550,
                      y: 440,
                      r: 120,
                      colorStops: [{
                        offset: 0, color: 'rgba(0,222,215, 0.2)' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#37FFF9' // 100% 处的颜色
                      }],
                      global: true // 缺省为 false
                    }
                  },
                  labelLine: {
                    lineStyle: {
                      color: '#37FFF9'
                    }
                  }
                  },
                {
                  value:yData[4], name:'十分危险',
                  itemStyle: {
                    color: {
                      type: 'radial',
                      x: 550,
                      y: 440,
                      r: 120,
                      colorStops: [{
                        offset: 0, color: 'rgba(255,86,36, 0.2)' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#FF5624' // 100% 处的颜色
                      }],
                      global: true // 缺省为 false
                    }
                  },
                  labelLine: {
                    lineStyle: {
                      color: '#FF5624'
                    }
                  }
                },
              ],
            }
          ]
        }
      }
    });
  }
  //威胁等级柱状图
  ThrenOption:any;
  getThrenOption(){
    this.http.get(environment.PUBLIC_URL+'/info/threatLevelNum').subscribe((req:any[])=> {
      if (req['data'] != null) {
        let xData = [];
        let yData1 = [];
        let yData2 = [];
        let totalData=[];
        let total:number;
        console.log(req['data']);
        xData.push(req['data'][0]['type']);
        for (let i = 0; i < req['data'].length; i++) {
          yData1.push(req['data'][i]['level'][0]);
          yData2.push(req['data'][i]['level'][1])
        }
        for(let j=0;j<yData1[0].length;j++){
          total=yData1[0][j]+yData2[0][j];
          totalData.push(total)
        }
        console.log("totalData========",totalData)
        this.ThrenOption={
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['木马','DNS'],
            textStyle: {
              color: 'rgba(55,255,249,1)',
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data:totalData,
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(55,255,249,1)',
                }
              },
              axisLabel: {
                color: 'rgba(55,255,249,1)'
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLine: {
                lineStyle: {
                  color: 'rgba(55,255,249,1)',
                }
              },
              splitLine: {
                show: false
              },
            }
          ],
          series : [
            {
              name:'木马',
              type:'bar',
              stack:'威胁',
              data:yData1[0],

            },
            {
              name:'DNS',
              type:'bar',
              stack:'威胁',
              data:yData2[0],
            },
          ]
        }
      }
    });
  }
  //获取木马ip访问统计排名
  TopSelectSet(){
    const params={
      n:this.TopSelect,
    };
    this.http.get(environment.PUBLIC_URL+'/info/trojanIpCount',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        let xData=[];
        let yData=[];
       for(let i=0;i<req['data'].length;i++){
         yData.push(req['data'][i]['ip']);
         xData.push(req['data'][i]['countnumber'])
       }
        this.IPOption = {
          color: ['#CD2626'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#CD2626',
              }
            },
          },
          yAxis: {
            type: 'category',  //决定显示横柱形还是竖柱形
            name: 'ip',
            data: yData.reverse(),
           splitLine: {
              show: false
            },
             axisLabel: {
              color: '#CD2626'
            },
            axisLine: {
              lineStyle: {
                color: '#CD2626',
              }
            },
          },
          series: [{
            name:'访问次数',
            data: xData.reverse(),
            type: 'bar',
          }]
        };
      }
    });
  }
  //获取DNSip访问统计
  DnsTopSelectSet(){
    const params={
      n:this.DnsTopSelect,
    };
    this.http.get(environment.PUBLIC_URL+'/info/dnsIpCount',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        let xData=[];
        let yData=[];
        for(let i=0;i<req['data'].length;i++){
          yData.push(req['data'][i]['ip']);
          xData.push(req['data'][i]['countnumber'])
        }
        this.DnsIPOption = {
          color: ['#CD2626'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#CD2626',
              }
            },
          },
          yAxis: {
            type: 'category',  //决定显示横柱形还是竖柱形
            name: 'ip',
            data: yData.reverse(),
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#CD2626'
            },
            axisLine: {
              lineStyle: {
                color: '#CD2626',
              }
            },
          },
          series: [{
            name:'访问次数',
            data: xData.reverse(),
            type: 'bar',
          }]
        };
      }
    });
  }
  //滑动标签设置
  tabIndex:number;
  test1(){
    if(this.tabIndex==0){

    }else{

    }
  }
}
