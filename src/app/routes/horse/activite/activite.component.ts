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
  //查询表单
  validateForm:FormGroup;
  /*  controlArray: any[] = [];
   isCollapse = true;*/
  listOfDisplayData=[];
  //总条数
  total:number;
  // 当前页码
  pageIndex: number;
  // 一页显示的条数
  pageSize: number;
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      srcIP  : [''],
      desIP  : [''],
      srcPort:[''],
      desPort:[''],
      /*   protocol:[''],
       trojanType:[''],
       threatLevel:[''],*/
      time:['']
    });
  }
  ngOnInit() {
    this.pageIndex=1;
    this.pageSize=10;
    this.total=0;
    this.getData();
  }

  //查询数据
  search(){

  }
  getData(){
    let params={
      page:(this.pageIndex-1),
      size:this.pageSize
    };
    this.http.get(environment.PUBLIC_URL+'/trojan',params).subscribe((req:any[]) => {
      if(req['data']!=null){
        this.listOfDisplayData=req['data'][0]['content'];
        console.log(req['data'][0]['content']);
        this.total=req['data'][0]['totalElements'];
        console.log(req['data'][0]['totalElements'])
      }else{
        this.listOfDisplayData=[];
        this.total=0
      }
    });
  }
  //重置查询表单
 /* initForm(){
    this.validateForm.reset();
  }*/
  refreshStatus(){

  }
  currentPageDataChange(){

  }
}
