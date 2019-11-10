import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
import {
  FormBuilder,
} from '@angular/forms';
import {environment} from "@env/environment";

@Component({
  selector: 'app-hourse-flowView',
  styleUrls: ['./flowView.component.less'],
  templateUrl: './flowView.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorseFlowViewComponent implements OnInit {
  //影响捕获报文数据图
   FlowOption:any;
  //影响捕获报文数据图选框数据
  FlowSelect:any;
  //影响捕获报文数据图选框数据源
  FlowOptionsDate=[];

  listOfParentData: any[] = [];
  listOfChildrenData: any[] = [];
  //源端口选框数据源
  SrcPortTopSelect:any;
  SrcPortOption:any;
  SrcPortTopOptions=[
    {id:10,name:'Top10'},
    {id:5,name:'Top5'},
    {id:3,name:'Top3'}
  ];
  //目的端口选框数据源
  DesPortOption:any;
  DesPortTopSelect:any;
  DesPortTopOptions=[
    {id:10,name:'Top10'},
    {id:5,name:'Top5'},
    {id:3,name:'Top3'}
  ];
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // 时间对象定义
    const timer = [
      {id: 1, name: '最近5分钟'},
      {id: 2, name: '最近1小时'},
      {id: 3, name: '最近24小时'},
      /*{ id: 4, name: '最近7天' },*/
    ];
    //设置警告图表单选框初始值
    this.getAlet(timer);
    this.SrcPortTopSelect=10;
    this.DesPortTopSelect=10;
  }

  getAlet(timer){
    this.FlowOptionsDate=timer;
    this.FlowSelect = 3;
  }
  timeSet(timer) {
    let stime;
  /*  let etime = moment();*/
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
     /* case 4:
        stime = moment().subtract(7, 'days');
        break;*/
    }
    return {
      stime: stime['_d'].getTime(),
    };
  }
  FlowDraw(data){
    if (data.length!=0){
      let xFlowData=[];
      let yProtocalData=[];
      let pro1=[];
      let pro2=[];
      let pro3=[];
      for (let i=data.length-1;i>-1;i--){
        yProtocalData=data[0].protocol;
        var day=moment(Number(data[i]['time'])).format('MM-DD HH:mm:ss');
        xFlowData.push(day);
        pro1.push(data[i]['size'][0]);
        pro2.push(data[i]['size'][1]);
        pro3.push(data[i]['size'][2])
      }
      console.log("yProtocalData",yProtocalData);
      console.log("xFlowData",xFlowData);
      console.log("pro1",pro1);
      console.log("pro2",pro2);
      console.log("pro3",pro3);
      this.FlowOption = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:yProtocalData,
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
            data:xFlowData,
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
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(55,255,249,1)',
              }
            },
          }
        ],
        series : [
          {
            name:'TCP',
            type:'bar',
            stack: '协议',
            data:pro1
           /* data:[320, 332, 301, 334, 390, 330, 320,130,145,134,123,134,145,124,135,142,234,134,555]*/
          },
          {
            name:'UDP',
            type:'bar',
            stack: '协议',
            data:pro2
            /*data:[120, 132, 101, 134, 90, 230, 210,345,133,643,123,234,123,555,234,245,223,124,432]*/
          },
          {
            name:'DNS',
            type:'bar',
            stack: '协议',
            data:pro3
          /*  data:[220, 182, 191, 234, 290, 330, 310,342,343,555,334,234,632,332,234,234,555,321,222]*/
          }
        ]
      };
    }else{
      this.FlowOption ={}
    }
  }
  changeTime() {
    let time = this.timeSet(this.FlowSelect);
    let params={
      time:time.stime
    };
    this.http.get(environment.PUBLIC_URL+'/trojan/view/flow',params).subscribe((req:any[])=>{
      let data;
      if(req['data']!=null){

        data=req['data'];
      }else{
        data=[]
      }
      this.FlowDraw(data);
      console.log(data)
    });
  }
  //恶意源端口
  SrcPortTopSelectSet(){
    const params={
      top:this.SrcPortTopSelect,
    };
    this.http.get(environment.PUBLIC_URL+'/trojan/view/srcPort',params).subscribe((req:any[])=> {
      if (req['data'] != null) {
        let ySrcDataNumber = [];
        let xSrcDataPort = [];
        for (let i = 0; i < req['data'].length; i++) {
          ySrcDataNumber.push(req['data'][i]['number']);
          xSrcDataPort.push(req['data'][i]['port']);
        }
        this.SrcPortOption = {
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
            type: 'category',
            data:xSrcDataPort,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#FFEC8B',
              }
            },
            axisLabel: {
              color: '#FFEC8B'
            }

          },
          yAxis: {
            name:'数量',
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#FFEC8B',
              }
            },
          },
          series: [
            {
              name: '访问次数',
              type: 'bar',
              data: ySrcDataNumber,
              stack: '访问次数',
              color:'#FFEC8B'
            },
          ]
        };

      }
    });
  }
  //恶意目的端口
  DesPortTopSelectSet(){
    const params={
      top:this.DesPortTopSelect,
    };
    this.http.get(environment.PUBLIC_URL+'/trojan/view/desPort',params).subscribe((req:any[])=> {
      if (req['data'] != null) {
        console.log(req['data']);
        let yDesDataNumber = [];
         let xDesDataPort = [];
        for (let i = 0; i < req['data'].length; i++) {
          yDesDataNumber.push(req['data'][i]['number']);
          xDesDataPort.push(req['data'][i]['port']);
        }
        this.DesPortOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data:xDesDataPort,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#FFE7BA',
              }
            },
            axisLabel: {
              color: '#FFE7BA'
            }

          },
          yAxis: {
            name:'访问次数',
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#FFE7BA',
              }
            },
          },
          series: [
            {
              name: '访问次数',
              type: 'bar',
              data: yDesDataNumber,
              stack: '访问次数',
              color:'#FFE7BA'
            },
          ]
        };

      }
    });
  }
}
