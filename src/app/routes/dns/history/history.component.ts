import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  FormBuilder, FormGroup,
} from '@angular/forms';
import {environment} from "@env/environment";
import * as moment from "moment";
import * as echarts from 'echarts';

@Component({
  selector: 'app-dns-history',
  styleUrls: ['./history.component.less'],
  templateUrl: './history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DnsHistoryComponent implements OnInit,AfterViewInit{
  /*折线图*/
  @ViewChild('Line',{static:true}) Line:ElementRef;
  myChartLine:any;
  /*DNS域名检测*/
  @ViewChild('domain',{static:true}) domain:ElementRef;
  myChartdomain:any;
  // 总条数
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
 /* Dns检测折线图数据*/
  TimeData=[];
  NumberData = [];
 /* 域名检测图数据*/
  xDomainData = [];
  yDomainData=[];
  // 查询表单
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
  ngAfterViewInit(){
    this.getLine();
    this.getDomain();
  }
  ngOnInit() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 0;
    this.getdata();
  }
 /* DNS折线图*/
  getLine(){
    this.myChartLine = echarts.init(this.Line.nativeElement);
    this.myChartLine.setOption({
      title: {
        text: 'DNS检测'
      },
      grid: {
        left: '3%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis'    // 鼠标触摸显示提示信息
      },
      xAxis: {
        name:'时间',
        type: 'category',
        data: []
      },
      yAxis: {
        name:'个数',
        type: 'value'
      },
      series: [{
        data:[],
        type: 'line',
        color:'#5CACEE',
        smooth: true
      }]
    });
    const  stime=86400000;
    const params={
      gap:stime.toString(),
    };
    this.myChartLine.showLoading();
    this.http.get(environment.PUBLIC_URL+'/historyView',params).subscribe((req:any)=>{
      if(req.data!=null) {
        for (const i of req.data) {
          const day = moment(Number(i.date)).format('MM-DD HH:mm:ss');
          this.TimeData.push(day);
          this.NumberData.push(i.number)
        }
        this.myChartLine.setOption({
          xAxis: {
            data: this.TimeData.reverse()
          },
          series: [{
            data:this.NumberData,
          }]
        });
      }
      this.myChartLine.hideLoading();
    });
  }
  /*DNS域名检测*/
  getDomain(){
    this.myChartdomain = echarts.init(this.domain.nativeElement);
    this.myChartdomain.setOption({
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
        left: '5%',
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
        type: 'category', /* 决定显示横柱形还是竖柱形*/
        name: '域名',
        data: [],
        splitLine: {
          show: false
        },
      },
      series: [{
        name:'统计次数',
        data: [],
        type: 'bar',
      }]
    });
    this.myChartdomain.showLoading();
    const param={
      n:10,
    };
    this.http.get(environment.PUBLIC_URL+'/countAllDomain',param).subscribe((req:any)=>{
      if(req.data!==null){
        for(const i of req.data){
          this.yDomainData.push(i.domain);
          this.xDomainData.push(i.countnumber)
        }
        this.myChartdomain.setOption({
          yAxis: {
            data: this.yDomainData.reverse(),
          },
          series: [{
            data: this.xDomainData.reverse(),
          }]
        });
      }
      this.myChartdomain.hideLoading();
    });
  }
  // 查询数据
  open(){
    this.visible = true;
    this.initForm();
  }
  search(){
    this.pageIndex=1;
    this.pageSize=10;
    this.getdata();
  }
  getdata(){
    if(this.validateForm.value.srcIplist!=null&&this.validateForm.value.srcIplist!==""){
      console.log();
      this.SrcIp=this.validateForm.value.srcIplist;
    }else{
      this.SrcIp=""
    }
    if(this.validateForm.value.desIplist!=null&&this.validateForm.value.desIplist!==""){
      console.log();
      this.DstIp=this.validateForm.value.desIplist;
    }else{
      this.DstIp=""
    }
    if(this.validateForm.value.citylist!=null&&this.validateForm.value.citylist!==""){
      console.log();
      this.city=this.validateForm.value.citylist;
    }else{
      this.city=""
    }
    if(this.validateForm.value.domain!=null&&this.validateForm.value.domain!==""){
      console.log();
      this.Domain=this.validateForm.value.domain;
    }else{
      this.Domain=""
    }
    const params1={
      page:(this.pageIndex-1),
      size:this.pageSize,
      srcIp:this.SrcIp,
      desIp:this.DstIp,
      city:this.city,
      domain:this.Domain
    };
    this.http.get(environment.PUBLIC_URL+'/detail',params1).subscribe((req:any)=>{
      if(req.data!=null){
        this.listOfDisplayData=req.data[0].content;
        this.total=req.data[0].totalElements;
      }else{
        this.listOfDisplayData=[];
        this.total=0;
      }
      this.visible = false;
    });
  }
  // 重置查询表单
  initForm(){
    this.validateForm.reset();
  }
  resetData(){
    this.initForm();
    this.getdata();
  }
  CancelAdd(){
    this.visible=false
  }
  refreshStatus():void{
    this.getdata()
  }
}
