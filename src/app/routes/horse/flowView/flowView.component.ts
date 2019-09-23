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

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // 时间对象定义
    const timer = [
      { id: 1, name: '最近5分钟' },
      { id: 2, name: '最近1小时' },
      { id: 3, name: '最近24小时' },
      /*{ id: 4, name: '最近7天' },*/
    ];
    //设置警告图表单选框初始值
    this.getAlet(timer);

    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: '192.168.32.1',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '172.168.1.1',
      });
    }
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
    /*  etime: etime['_d'].getTime(),*/
    };
  }
 /* FlowOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['TCP', 'UDP', 'DNS']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018.2.3', '2018.3.3', '2018.4.2', '2018.5.3', '2018.6.3', '2018.7.2', '2018.7.3', '2018.8.3', '2018.9.2', '2018.10.3', '2018.11.3', '2018.12.2']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'TCP',
        type: 'bar',
        stack: '协议',
        data: [320, 332, 301, 334, 390, 330, 320, 130, 145, 134, 123, 134]
      },
      {
        name: 'UDP',
        type: 'bar',
        stack: '协议',
        data: [120, 132, 101, 134, 90, 230, 210, 345, 133, 643, 123,230]
      },
      {
        name: 'DNS',
        type: 'bar',
        stack: '协议',
        data: [220, 182, 191, 234, 290, 330, 310, 342, 343, 555,232]
      },
    ]
  }*/
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
        pro1.push(data[i]['size'][0])
        pro2.push(data[i]['size'][1])
        pro3.push(data[i]['size'][2])
      }
      this.FlowOption = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:yProtocalData
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
           }
        ],
        yAxis : [
          {
            type : 'value'
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
    });
  }
}
