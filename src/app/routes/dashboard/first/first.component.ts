import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
import {environment} from "@env/environment";


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
  //表格数据
  listOfDisplayData=[];
  //总条数
  total:number;
  // 当前页码
  pageIndex: number;
  // 一页显示的条数
  pageSize: number;
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
    this.pageIndex=1;
    this.pageSize=10;
    this.total=0;
    //设置警告图表单选框初始值
    this.optionSet(timer);
    this.AaptureMessageSet();
    this.DetectFlowSet();
    this.getFlowdata();
  }
  optionSet(timer){
   /* this.aletDistributeOptions = timer;*/
    this.AaptureMessageOptions = timer;
    this.DetectFlowOptions = timer;
    this.threatenOptions = timer;
   /* this.aletDistributeSelect = 3;*/
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
/*  changeAapture(){
    this.AaptureMessageSet();
  }
  changeDetect(){
    this.DetectFlowSet();
  }
  changeThreaten(){
    this.getFlowdata();
  }*/
/*  changeTime(type) {
    switch (type) {/!*
      case 'alet':
        this.aletDistributeSet();
        break;*!/
  /!*    case 'massage':
        this.AaptureMessageSet();
        break;*!/
      case 'flow':
        this.DetectFlowSet();
        break;
      case 'threaten':
        this.getFlowdata();
        break;
    }
  }*/
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
        yAaptureData.push(data[i]['packageNum']);
        let day=moment(Number(data[i]['time'])).format('MM-DD HH:mm:ss');
        xAaptureData.push(day);
      }
      this.AaptureOption = {
        tooltip: {
          trigger: 'axis',
        },
        color: ['#7cb5ec'],
        xAxis: { type: 'category', data: xAaptureData },
        yAxis: { name: '流量(M)', type: 'value', splitLine: { show: false } },
        series: [
          {
            symbol: 'none',
            data: yAaptureData,
            type: 'line',
            areaStyle: { color: ['#7cb5ec'] },
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
        yDetectFlowData.push(data[i]['flowNum']);
        let day=moment(Number(data[i]['time'])).format('MM-DD HH:mm:ss');
        xDetectFlowData.push(day);
      }
      this.FlowOption={
        tooltip: {
          trigger: 'axis',
        },
        color: ['#7cb5ec'],
        xAxis: { type: 'category', data: xDetectFlowData },
        yAxis: { name: '流量(M)', type: 'value', splitLine: { show: false } },
        series: [
          {
            symbol: 'none',
            data: yDetectFlowData,
            type: 'line',
            areaStyle: { color: ['#7cb5ec'] },
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
  //获取威胁信息
  getFlowdata(){
    let time = this.timeSet(this.DetectFlowSelect);
    let params={
      time:time.stime,
      page:(this.pageIndex-1),
      size:this.pageSize
    };
    this.http.get(environment.PUBLIC_URL+'/info/trojan',params).subscribe((req:any[]) => {
      if(req['data']!=null){
        this.listOfDisplayData=req['data'][0]['content'];
        this.total=req['data'][0]['totalElements'];
      }else{
        this.listOfDisplayData=[];
        this.total=0;
      }
    });
  }
  refreshStatus(){
    this.getFlowdata();
  }
  currentPageDataChange($event): void {
  }
  Option1 = {
/*    title : {
      text: '用户访问来源',
      x:'center'
    },*/
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['忽略','可疑','危险','十分危险']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'忽略'},
          {value:310, name:'可疑'},
          {value:234, name:'危险'},
          {value:135, name:'十分危险'},
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  Option2 = {
    title: {
      text: '访问次数',
    },
    xAxis: {
      type: 'category',
      data: ['192.168.1.1', '1.1.1.1', '2.2.2.2', '3.3.3.2', '4.4.4.4', '5.5.5.5', '6.6.6.6']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }]
  };
  Option3 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  };



}
