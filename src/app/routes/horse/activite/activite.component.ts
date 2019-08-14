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
    this.getData();
  }

  //查询数据
  search(){

  }
  getData(){
    this.http.get(environment.PUBLIC_URL+'/trojan').subscribe((req:any[]) => {
      if(req['data']!=null){
        this.listOfDisplayData=req['data'];
      }else{
        this.listOfDisplayData=[];
      }
    });
  }
  //重置查询表单
 /* initForm(){
    this.validateForm.reset();
  }*/
  currentPageDataChange(){

  }
}
