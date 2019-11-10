import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  FormBuilder,
} from '@angular/forms';
import {environment} from "@env/environment";

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
  }
  getData(){
    const params={
      page:(this.pageIndex-1),
      size:this.pageSize,
      userId:1
    };
    this.http.get(environment.PUBLIC_URL+'/history',params).subscribe((req:any[])=>{
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
 showDetail(data){
   console.log(data.hId);
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

  }



}
