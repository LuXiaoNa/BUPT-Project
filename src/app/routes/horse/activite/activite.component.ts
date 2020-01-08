import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-hourse-activite',
  styleUrls: ['./activite.component.less'],
  templateUrl: './activite.component.html',
})
export class HorseActiviteComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      srcIP  : [''],
      desIP  : [''],
      srcPort:[''],
      desPort:[''],
      protocol:[''],
      type:[''],
      threatLevel:[''],
      time:['']
    });
  }
  // 查询表单
  validateForm:FormGroup;
  visible=false;
  listOfDisplayData=[];
  // 总条数
  total:number;
  // 当前页码
  pageIndex: number;
  // 一页显示的条数
  pageSize: number;
  toTime:string;
  fromTime:string;
  SrcPort:number;
  DesPort:number;
  ThreatLevel:number;
  SrcIp:string;
  DstIp:string;
  Protocol:string;
  Type:string;
  // 排序
  sortName:string | null = null;
  sortValue:string | null = null;
  ngOnInit() {
    this.pageIndex=1;
    this.pageSize=10;
    this.total=0;
    this.getData();
  }
  // 查询数据
  open(){
      this.visible = true;
      this.initForm();
  }
  CancelAdd(){
    this.visible = false;
  }
 search(){
   this.pageIndex=1;
   this.pageSize=10;
   this.getData();
 }
  getData(){
    if(this.validateForm.value.srcIP!=null&&this.validateForm.value.srcIP!==""){
      console.log();
      this.SrcIp=this.validateForm.value.srcIP;
    }else{
      this.SrcIp=""
    }
    if(this.validateForm.value.desIP!=null&&this.validateForm.value.desIP!==""){
      console.log(this.validateForm.value.desIP);
      this.DstIp=this.validateForm.value.desIP;
    }else{
      this.DstIp=""
    }
    if(this.validateForm.value.protocol!=null&&this.validateForm.value.protocol!==""){
      console.log();
      this.Protocol=this.validateForm.value.protocol;
    }else{
      this.Protocol=""
    }
    if(this.validateForm.value.type!==null&&this.validateForm.value.type!==""){
      console.log();
      this.Type=this.validateForm.value.type;
    }else{
      this.Type=""
    }
    if(this.validateForm.value.time!==[]&&this.validateForm.value.time!==null&&this.validateForm.value.time!==""){
      this.fromTime = new Date(this.validateForm.value.time[0]).getTime().toString();
      this.toTime = new Date(this.validateForm.value.time[1]).getTime().toString();
    }else{
      this.fromTime="";
      this.toTime ="";
    }
    if(this.validateForm.value.srcPort!==""&&this.validateForm.value.srcPort!==null){
      console.log();
      this.SrcPort=Number(this.validateForm.value.srcPort)
    }else{
      this.SrcPort=-1
    }
    if(this.validateForm.value.desPort!==""&&this.validateForm.value.desPort!==null){
      console.log();
      this.DesPort=Number(this.validateForm.value.desPort);
    }else{
      this.DesPort=-1;
    }
    if(this.validateForm.value.threatLevel!==""&&this.validateForm.value.threatLevel!==null){
      console.log();
      this.ThreatLevel=Number(this.validateForm.value.threatLevel)
    }else{
      this.ThreatLevel=-1;
    }
   const params={
     page:(this.pageIndex-1),
     size:this.pageSize,
     fromTime:this.fromTime,
     toTime:this.toTime,
     srcIP:this.SrcIp,
     desIP:this.DstIp,
     srcPort:this.SrcPort,
     desPort:this.DesPort,
     protocol:this.Protocol,
     type:this.Type,
     threatLevel:this.ThreatLevel,
   };
   this.http.get(environment.PUBLIC_URL+'/trojan',params).subscribe((req:any)=>{
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
  // 重置数据
  resetData(){
    this.initForm();
    this.getData();
  }
  refreshStatus():void{
    this.getData()
  }
  sort(sort:{key:string;value:string}):void{
    /*console.log(key)*/
    this.sortName = sort.key;
    this.sortValue = sort.value;
   /* this.listOfDisplayData:Array<{[key: string]: string | number}>*/
   /* const data=this.listOfDisplayData;*/
    if( this.sortName && this.sortValue){
      this.listOfDisplayData = this.listOfDisplayData.sort((a,b)=>
        this.sortValue==='ascend'
          ?a[this.sortName!]>b[this.sortName!]
          ? 1
          :-1
          :b[this.sortName!]>a[this.sortName]
          ?1
          :-1
      );
    }/*else{
      this.listOfDisplayData= this.listOfDisplayData;
    }*/
  }
}
