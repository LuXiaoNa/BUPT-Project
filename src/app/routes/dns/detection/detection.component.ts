import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  FormBuilder,
} from '@angular/forms';
import {environment} from "@env/environment";

@Component({
  selector: 'app-dns-detection',
  styleUrls: ['./detection.component.less'],
  templateUrl: './detection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DnsDetectionComponent implements OnInit {
  listOfDisplayData=[];
  //总条数
/*  total:number;
  // 当前页码
  pageIndex: number;
  // 一页显示的条数
  pageSize: number;*/
  DnsOption:any;
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
   /* this.pageIndex=1;
    this.pageSize=10;
    this.total=0;*/
    this.getData();
    this.getDns();
  }
  getData(){
    const params={
     /* page:(this.pageIndex-1),
      size:this.pageSize,*/
     userId:1
    };
    this.http.get(environment.PUBLIC_URL+'/dectDns',params).subscribe((req:any[])=>{
      console.log('======39===',req)
      if(req['data']!=null){
        console.log(req['data']);
        this.listOfDisplayData=req['data'][0]['content'];
      /*  this.total=req['data'][0]['totalElements'];*/
      }else{
        this.listOfDisplayData=[];
      /*  this.total=0;*/
      }
    });

  }
  getDns(){
    this.DnsOption={
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
    }
  }
 /* listOfDisplayData=[
    {
     /!* detectime:1562921324343,
      detecnums:10,*!/
      Domainname:"服务器1",
      Domainip:"192.168.32.1"
    },
    {
      /!*detectime:1563921324343,
      detecnums:20,*!/
      Domainname:"服务器2",
      Domainip:"192.168.32.3"
    },
    {
     /!* detectime:1564921324343,
      detecnums:50,*!/
      Domainname:"服务器3",
      Domainip:"192.168.32.2"
    },
  ];*/

  refreshStatus(){
    /*this.search();*/
  }
  currentPageDataChange(){

  }
}
