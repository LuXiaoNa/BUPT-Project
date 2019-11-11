import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  FormBuilder,
} from '@angular/forms';
import {environment} from "@env/environment";
import * as moment from "moment";

@Component({
  selector: 'app-dns-history',
  styleUrls: ['./history.component.less'],
  templateUrl: './history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DnsHistoryComponent implements OnInit {
  //总条数
  total:number;
  // 当前页码
  pageIndex: number;
  // 一页显示的条数
  pageSize: number;
  listOfDisplayData=[];
  //详情对话框是否活性
  isVisible=false;
  //详情数据
  dataSetdynamic=[];
  //总条数
  totalDetail:number;
  // 当前页码
  pageIndexDetail: number;
  // 一页显示的条数
  pageSizeDetail: number;
 /* Option:any;*/
  Option={
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  };
  TimeOptions = [
    { id: 1, name: '5分钟' },
    { id: 2, name: '1小时' },
    { id: 3, name: '24小时' },
  ];
  TopSelect:any;
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.total=0;
    this.totalDetail=0;
    this.pageSize=10;
    this.pageIndex=1;
    this.pageSizeDetail=10;
    this.pageIndexDetail=1;
    this.getData();
    this.TopSelect=3;
  }
//获取曲线图
  TopSelectSet(){
    let stime;
    switch (this.TopSelect) {
      case 1:
        stime=300000;
       /* stime = moment().subtract(5, 'minutes');*/
        break;
      case 2:
        stime=3600000;
       /* stime = moment().subtract(1, 'hours');*/
        break;
      case 3:
        stime=86400000;
        /*stime = moment().subtract(1, 'days');*/
        break;
    }
    const params={
      time:stime,
    };
    /*this.Option={

    }*/
  /*  this.http.get(environment.PUBLIC_URL+'/info/packageNum',params).subscribe((req:any[])=>{
      let data;
      if(req['data']!=null){
        data = req['data'];
      }else{
        data = [];
      }
    });*/
  }

//检测结果
  getData(){
    const params={
      page:(this.pageIndex-1),
      size:this.pageSize,
      userId:1
    };
    this.http.get(environment.PUBLIC_URL+'/detail',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        this.listOfDisplayData=req['data'][0]['content'];
        console.log(req['data']);
        this.total=req['total'];
      }else{
        this.listOfDisplayData=[];
        this.total=0;
      }
    });
  }
  refreshStatus(){
  }
  currentPageDataChange($event){
  }




  /*
 showDetail(data){
   this.isVisible=true;
   const params={
      hId:data.hId,
      page:(this.pageIndexDetail-1),
      size:this.pageSizeDetail,
   };
   this.http.get(environment.PUBLIC_URL+'/detail',params).subscribe(
     (req:any[])=>{
       if(req['data']!=null){
         this.dataSetdynamic=req['data'][0]['content'];
         this.totalDetail=req['total'];
       }else{
         this.dataSetdynamic=[];
         this.totalDetail=0;
       }
     });
 }
//关闭详情弹出框
  detailConceal(){
    this.isVisible=false;
  }
  refreshStatusDetail(){
  }
  currentPageDataChangeDetail($event){

  }*/



}
