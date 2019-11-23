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
  //影响捕获报文数据图
  AaptureOption:any;
  //影响检测流量数据图
  FlowOption:any;
  time:string;
  srcIP:string;
  desIP:string;
  type:string;
  info:string;
  IPOption:any;
  DnsIPOption:any;
  //域名威胁等级
  DnsOption:any;
  //威胁等级柱状图
  ThrenOption:any;
  //滑动标签
  tabIndex:number;
  dituData:[];
  constructor(
    private http: _HttpClient
  ) {}
  ngOnInit() {
    this.aletDistributeSet();
    this.AaptureMessageSet();
    this.DetectFlowSet();
    this.getDns();
    this.getThrenOption();
    this.tabIndex=0;
    this.TopSelectSet();
    this.DnsTopSelectSet();
    this.http.get(environment.PUBLIC_URL+'/info/ipAddress').subscribe((req:any[])=>{
      if(req['data']!=null){
        this.dituData=req['data'];
        console.log(this.dituData)
      }
    });
    this.getDitu();
  }
  test1(){
    if(this.tabIndex==0){
      this.TopSelectSet();
    }else{
      this.DnsTopSelectSet();
    }
  }
  //地图
  Option:any;
  getDitu(){
    this.Option = {
      title : {
        text: 'IP攻击实时监控',
        subtext: '',
        left: 'center',
        textStyle: {
          fontSize: '24',
        },
      },
      tooltip : {   //悬浮显示数据
        trigger: 'item',
        formatter: function (val) {
          return `攻击城市：${val.data.name}<br>攻击IP：${val.data.warn}`;
        }
      },
     /* legend: {     //标记省份
        orient: 'vertical',
        x:'left',
       /!* data:['����'],*!/
        selectedMode: 'single',
        textStyle : {
          color: '#575757'
        }
      },*/
      toolbox: {
        show : true,
        orient : 'vertical',
        x: 'right',
        y: 'top',
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false}, //数据视图
          restore : {show: true}, //刷新
          saveAsImage : {show: true}   //保存
        }
      },
      dataRange: {
        min : 0,
        max : 100,
        x: 'left',
        top: 'bottom',
        calculable : true,
       /* color: ['#0BC7FA','#0BB3E6','#128DE6','#1173E','#1949E6'],*/
        color: ['#5CACEE','#00688B','#104E8B', '#4682B4','#36648B'],
        textStyle:{
          color:'#fff'
        }
      },
      markLine : {
        smooth:true,
        effect : {
          show: true,
          scaleSize: 1,
          period: 30,
          color: '#fff',
          shadowBlur: 10
        },
        itemStyle : {
          normal: {
            borderWidth:1,
            lineStyle: {
              type: 'solid',
              shadowBlur: 10
            }
          }
        },
        data : [
          //[{name:'�Ϻ�'}, {name:'����',value:95}]
        ]
      },
      series : [
        {
          name: '省会',
          type: 'map',
          mapType: 'china',
          roam: false,
         /* label: {显示省份名称
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },*/
          itemStyle: {
          /*  color: 'red',
            areaColor: '#36648B',*/
            normal: {
              borderWidth:1,
              lineStyle: {
                type: 'solid',
                shadowBlur: 10
              }
            }
          },
          emphasis: {
            itemStyle: {
              areaColor: '#36648B'
            }
          },
        /*  data:[this.dituData],*/
          data:[
            {name: '北京',value: 2},
            {name: '天津',value: Math.round(Math.random()*100)},
            {name: '上海',value: Math.round(Math.random()*100)},
            {name: '重庆',value: Math.round(Math.random()*100)},
            {name: '河北',value: Math.round(Math.random()*100)},
            {name: '河南',value: Math.round(Math.random()*100)},
            {name: '云南',value: Math.round(Math.random()*100)},
            {name: '辽宁',value: Math.round(Math.random()*100)},
            {name: '黑龙江',value: 100},
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
            {name: '台湾',value: Math.round(Math.random()*100)},
            {name: '香港',value: Math.round(Math.random()*100)},
            {name: '澳门',value: Math.round(Math.random()*100)},
            {name: '菏泽',value: Math.round(Math.random()*100),warn:'11'}
          ]
        }
      ]
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
  //获取报文数据
  AaptureMessageSet(){
    let stime;
    stime = moment().subtract(1, 'days');
    console.log(stime['_d'].getTime());
    let params={
      time:stime['_d'].getTime(),
    };
    console.log(stime['_d'].getTime());
    this.http.get(environment.PUBLIC_URL+'/info/packageNum',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        console.log(req['data']);
        let yAaptureData=[];
        let xAaptureData=[];
        for (let i=0;i<req['data'].length;i++){
          yAaptureData.push(req['data'][i]['packageNum']/10000);
          let day=moment(Number(req['data'][i]['time'])).format('MM-DD HH:mm:ss');
          xAaptureData.push(day);
        }
        this.AaptureOption = {
          tooltip: {
            trigger: 'axis',
          },
          color: ['#1E90FF'],
          xAxis: {
            type: 'category',
            data: xAaptureData,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#1E90FF',
              }
            },
            axisLabel: {
              color: '#1E90FF'
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
                color: '#1E90FF',
              }
            }
          },
          series: [
            {
              symbol: 'none',
              data: yAaptureData,
              type: 'line',
              areaStyle: { color: ['#1E90FF'] },
            },
          ],
        };
      }/*else{
        this.AaptureOption = {
        }
      }*/
    });
  }
  //获取检测流量数据
  DetectFlowSet(){
    let stime;
    stime = moment().subtract(1, 'days');
    let params={
      time:stime['_d'].getTime(),
    };
    this.http.get(environment.PUBLIC_URL+'/info/flowNum',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        let yDetectFlowData=[];
        let xDetectFlowData=[];
        for (let i=0;i<req['data'].length;i++){
          yDetectFlowData.push(req['data'][i]['flowNum']/1048576);
          let day=moment(Number(req['data'][i]['time'])).format('MM-DD HH:mm:ss');
          xDetectFlowData.push(day);
        }
        this.FlowOption={
          tooltip: {
            trigger: 'axis',
          },
          color: ['#7AC5CD'],
          xAxis: {
            type: 'category',
            data: xDetectFlowData,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#7AC5CD',
              }
            },
            axisLabel: {
              color: '#7AC5CD'
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
                color: '#7AC5CD',
              }
            }
          },
          series: [
            {
              symbol: 'none',
              data: yDetectFlowData,
              type: 'line',
              areaStyle: { color: ['#7AC5CD'] },
            },
          ],
        }
      }else{
        this.FlowOption={}
      }
    });
  }
  //DNS域名危险等级
  getDns(){
    this.http.get(environment.PUBLIC_URL+'/info/threatLevel').subscribe((req:any[])=> {
      if (req['data'] != null) {
        let xData = [];
        let yData = [];
        for (let i = 0; i < req['data'].length; i++) {
          xData.push(req['data'][i]['dangerLevel']);
          yData.push(req['data'][i]['number'])
        }
        this.DnsOption = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['可以忽略','一般','值得注意','危险','十分危险'],
          },
          series : [
            {
              name: '危险等级',
              type: 'pie',
              center: ['55%', '53%'],
              radius: ['0', '90'],
              itemStyle: {
                borderColor: '#04192b',
                borderWidth: 1
              },
              data:[
                {value:yData[0], name:'可以忽略'},
                {value:yData[1], name:'一般'},
                {value:yData[2], name:'值得注意'},
                {value:yData[3], name:'危险'},
                {value:yData[4], name:'十分危险'},
              ],
            }
          ]
        }
      }
    });
  }
  //威胁等级堆叠柱状图
  getThrenOption(){
    this.http.get(environment.PUBLIC_URL+'/info/threatLevelNum').subscribe((req:any[])=> {
      if (req['data'] != null) {
        let xData = [];
        let yData1 = [];
        let yData2 = [];
        xData.push(req['data'][0]['type']);
        for (let i = 0; i < req['data'].length; i++) {
          yData1.push(req['data'][i]['level'][0]);
          yData2.push(req['data'][i]['level'][1])
        }
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
              color: '#FF3030',
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
              data:['可以忽略','一般','值得注意','危险','十分危险'],
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#FF3030',
                }
              },
              axisLabel: {
                color: '#FF3030'
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLine: {
                lineStyle: {
                  color: '#FF3030',
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
      n:10,
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
      n:10,
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

}
