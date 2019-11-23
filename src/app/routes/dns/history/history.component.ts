import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  FormBuilder, FormGroup,
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
  SrcIp:string;
  DstIp:string;
  city:string;
  Domain:string;
  //DNS检测图获取数据
  Option:any;
  //DNS域名统计图获取数据
  domainOption:any;
  /*TimeOptions = [
    { id: 1, name: '5分钟' },
    { id: 2, name: '1小时' },
    { id: 3, name: '24小时' },
  ];*/
  /*TopSelect:any;*/
  //查询表单
  validateForm:FormGroup;
  visible=false;
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      srcIplist  : [''],
      desIplist  : [''],
      citylist:[''],
      domain:[''],
    });
  }
  ngOnInit() {
    this.total = 0;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.search();
    this.getDomainOption();
    this.TopSelectSet();
  }
  //查询数据
  open(){
    this.visible = true;
    this.pageIndex=1;
    this.pageSize=10;
  }

  search(){
    if(this.validateForm.value.srcIplist!=null&&this.validateForm.value.srcIplist!=""){
      this.SrcIp=this.validateForm.value.srcIplist;
    }else{
      this.SrcIp=""
    }
    if(this.validateForm.value.desIplist!=null&&this.validateForm.value.desIplist!=""){
      this.DstIp=this.validateForm.value.desIplist;
    }else{
      this.DstIp=""
    }
    if(this.validateForm.value.citylist!=null&&this.validateForm.value.citylist!=""){
      this.city=this.validateForm.value.citylist;
    }else{
      this.city=""
    }
    if(this.validateForm.value.domain!=null&&this.validateForm.value.domain!=""){
      this.Domain=this.validateForm.value.domain;
    }else{
      this.Domain=""
    }
    const params={
      page:(this.pageIndex-1),
      size:this.pageSize,
      srcIp:this.SrcIp,
      desIp:this.DstIp,
      city:this.city,
      domain:this.Domain
    };
    this.http.get(environment.PUBLIC_URL+'/detail',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        this.listOfDisplayData=req['data'][0]['content'];
        this.total=req['data'][0]['totalElements'];

      }else{
        this.listOfDisplayData=[];
        this.total=0;
      }
      this.visible = false;
      this.initForm();
    });
  }
  //重置查询表单
  initForm(){
    this.validateForm.reset();
  }
  resetData(){
    this.search();
  }
  CancelAdd(){
    this.visible=false
  }
//获取DNS检测曲线图
  TopSelectSet(){
    //一天时间
    let  stime=86400000;
    const params={
      gap:stime.toString(),
    };
    this.http.get(environment.PUBLIC_URL+'/historyView',params).subscribe((req:any[])=>{
      if(req['data']!=null) {
        let TimeData = [];
        let NumberData = [];
        for (let i = 0; i < req['data'].length; i++) {
          let day = moment(Number(req['data'][i]['date'])).format('MM-DD HH:mm:ss');
          TimeData.push(day);
          NumberData.push(req['data'][i]['number'])
        }
        this.Option = {
          title: {
            text: 'DNS检测'
          },
          tooltip: {
            trigger: 'axis'    //鼠标触摸显示提示信息
          },
          xAxis: {
            name:'时间',
            type: 'category',
            data: TimeData.reverse()
          },
          yAxis: {
            name:'个数',
            type: 'value'
          },
          series: [{
            data: NumberData,
            type: 'line',
            color:'#5CACEE',
            smooth: true
          }]
        }
      }
    });
  }
  //DNS域名统计图加载
  getDomainOption(){
    const params={
      n:10,
    };
    this.http.get(environment.PUBLIC_URL+'/countAllDomain',params).subscribe((req:any[])=>{
      console.log('=======166====',req['data']);
      let data;
      if(req['data']!=null){
        data=req['data']
       /* let xData=[];
        let yData=[];
        for(let i=0;i<req['data'].length;i++){
          yData.push(req['data'][i]['domain']);
          xData.push(req['data'][i]['countnumber'])
        }
        this.domainOption = {
          title: {
            text: 'DNS疑似域名统计'
          },
          color: ['#CD2626'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            name:'次数',
            type: 'value',
            splitLine: {
              show: false
            },
          },
          yAxis: {
            type: 'category',  //决定显示横柱形还是竖柱形
            name: '域名',
            data: yData.reverse(),
            splitLine: {
              show: false
            },
          },
          series: [{
            name:'统计次数',
            data: xData.reverse(),
            type: 'bar',
          }]
        };*/
      }else{
        data=[];
      }
      console.log(data.length)
      this.domainOptionDraw(data)
    });
  }
  //DNS域名统计描绘
  domainOptionDraw(data){
    console.log(data)
    if(data.length>0){
      let xData=[];
      let yData=[];

      for(let i=0;i<data.length;i++){
        yData.push(data[i]['domain']);
        xData.push(data[i]['countnumber'])
      }
      console.log('yData',yData)
      console.log('xData',xData)
      this.domainOption = {
        title: {
          text: 'DNS疑似域名统计'
        },
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
          name:'统计次数',
          data: xData.reverse(),
          type: 'bar',
        }]
      };
    }else{
      this.domainOption ={}
    }
  }
  refreshStatus(){
    this.search();
  }
  currentPageDataChange($event){
  }
}
