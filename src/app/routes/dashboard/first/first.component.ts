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
  eventSort: any;
  //影响警告分布数据图
  aletDistributeSelect:any;
  //影响警告分布数据图单选框数据
  aletDistributeOptions=[];
  //影响捕获报文数据图
  AaptureOption:any;
  //影响捕获报文数据图选框数据
  AaptureMessageSelect:any;
  //影响捕获报文数据图选框数据源
  AaptureMessageOptions=[];
  //捕获报文x轴数据
  yAaptureData=[];
  //捕获报文y轴数据
  xAaptureData=[];
  //影响检测流量数据图
  FlowOption:any;
  //影响检测流量数据图单选框数据
  DetectFlowSelect:any;
  //影响检测流量数据图选框数据源
  DetectFlowOptions=[];
  //捕获报文x轴数据
  yDetectFlowData=[];
  //捕获报文y轴数据
  xDetectFlowData=[];
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
    this.getFlowdata();
    this.aletDistributeSet();
    this.AaptureMessageSet();
    this.DetectFlowSet();
  }
  optionSet(timer){
    this.aletDistributeOptions = timer;
    this.AaptureMessageOptions = timer;
    this.DetectFlowOptions = timer;
    this.threatenOptions = timer;
    this.aletDistributeSelect = 1;
    this.AaptureMessageSelect = 1;
    this.DetectFlowSelect = 1;
    this.threatenSelect = 1;
  }

  timeSet(timer) {
    let stime;
 /*   let etime = moment();*/
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
      stime: stime['_d'].getTime(),
     /* etime: etime['_d'].getTime(),*/
    };
  }

  changeTime(type) {
    switch (type) {
      case 'alet':
        this.aletDistributeSet();
        break;
      case 'massage':
        this.AaptureMessageSet();
        break;
      case 'flow':
        this.DetectFlowSet();
        break;
      case 'threaten':
        this.getFlowdata();
        break;
    }
  }
  //获取警告数据
  notHandleNum:Number;
  handledNum:Number;
  threatNum:Number;
  aletDistributeSet(){
    let time = this.timeSet(this.aletDistributeSelect);
    console.log(time.stime);
    let params={
      time:time.stime,
    };
    this.http.get(environment.PUBLIC_URL+'/info/threatNum',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        this.notHandleNum=req['data'][0]['notHandleNum'];
        this.handledNum=req['data'][0]['handledNum'];
        this.threatNum=req['data'][0]['threatNum'];
      }
    });
  }
  //获取报文数据
  AaptureMessageSet(){
    let time = this.timeSet(this.AaptureMessageSelect);
    let params={
      time:time.stime,
    };
    this.http.get(environment.PUBLIC_URL+'/info/packageNum',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        for (let i=0;i<req['data'].length;i++){
          this.yAaptureData.push(req['data'][i]['packageNum']);
          let day=moment(Number(req['data'][i]['time'])).format('MM-DD HH:mm:ss');
          this.xAaptureData.push(day);
        }
      }
    });
    console.log( this.xAaptureData);
    console.log(this.yAaptureData)
    this.AaptureOption = {
      tooltip: {
        trigger: 'axis',
      },
      color: ['#7cb5ec'],
      xAxis: { type: 'category', data: this.xAaptureData },
      yAxis: { name: '流量(M)', type: 'value', splitLine: { show: false } },
      series: [
        {
          symbol: 'none',
          data: this.yAaptureData,
          type: 'line',
          areaStyle: { color: ['#7cb5ec'] },
        },
      ],
    };
  }
  //获取检测流量数据
  DetectFlowSet(){
    let time = this.timeSet(this.DetectFlowSelect);
    let params={
      time:time.stime,
    };
    this.http.get(environment.PUBLIC_URL+'/info/flowNum',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        for (let i=0;i<req['data'].length;i++){
          this.yDetectFlowData.push(req['data'][i]['flowNum']);
          let day=moment(Number(req['data'][i]['time'])).format('MM-DD HH:mm:ss');
          this.xDetectFlowData.push(day);
        }
      }
    });

    this.FlowOption={
      tooltip: {
        trigger: 'axis',
      },
      color: ['#7cb5ec'],
      xAxis: { type: 'category', data: this.xDetectFlowData },
      yAxis: { name: '流量(M)', type: 'value', splitLine: { show: false } },
      series: [
        {
          symbol: 'none',
          data: this.yDetectFlowData,
          type: 'line',
          areaStyle: { color: ['#7cb5ec'] },
        },
      ],
    }
  }
  //获取威胁信息
  getFlowdata(){
    let time = this.timeSet(this.DetectFlowSelect);
    let params={
      time:time.stime,
      page:(this.pageIndex-1),
      size:this.pageSize
    };
    console.log(this.pageIndex-1);
    console.log(this.pageSize)
    this.http.get(environment.PUBLIC_URL+'/info/trojan',params).subscribe((req:any[]) => {
      if(req['data']!=null){
        this.listOfDisplayData=req['data'][0]['content'];
        console.log(req['data'][0]['content']);
        this.total=req['data'][0]['totalElements'];
        console.log(req)
        console.log(req['data'][0]['totalElements'])
      }else{
        this.listOfDisplayData=[];
      }
    });
  }
  refreshStatus(){

  }
  currentPageDataChange($event): void {
    this.listOfDisplayData = $event;
  }
}
