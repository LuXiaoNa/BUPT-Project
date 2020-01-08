import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-delon-form',
  styleUrls: ['./form.component.less'],
  templateUrl: './form.component.html',
})
export class DelonFormComponent implements OnInit {
  // 查询表单
  validateForm:FormGroup;
/*  controlArray: any[] = [];
  isCollapse = true;*/

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      SrcIp  : [''],
      DstIp  : [''],
      SrcPort:[''],
    /*  DstPort:[''],
      ProtocolType:[''],
      HorseType:[''],
      ThreatLevel:[''],*/
      DiscoveryTime:['']
    });
  }
  data=[
  {
    SrcIp: '192.168.32.20',
    DstIp: '172.18.1.1',
    SrcPort:'80',
    DstPort:'20',
    ProtocolType:'攻击类型',
    HorseType:'病毒',
    ThreatLevel:'中级',
    DiscoveryTime: '2019-9-20',
  },
  {
    SrcIp: '192.168.32.20',
    DstIp: '172.18.1.1',
    SrcPort:'80',
    DstPort:'20',
    ProtocolType:'攻击类型',
    HorseType:'病毒',
    ThreatLevel:'中级',
    DiscoveryTime: '2019-9-20',
  },
  {
    SrcIp: '192.168.32.20',
    DstIp: '172.18.1.1',
    SrcPort:'80',
    DstPort:'20',
    ProtocolType:'攻击类型',
    HorseType:'病毒',
    ThreatLevel:'中级',
    DiscoveryTime: '2019-9-20',
  },
  {
    SrcIp: '192.168.32.20',
    DstIp: '172.18.1.1',
    SrcPort:'80',
    DstPort:'20',
    ProtocolType:'攻击类型',
    HorseType:'病毒',
    ThreatLevel:'中级',
    DiscoveryTime: '2019-9-20',
  }
];
  listOfDisplayData=[...this.data];
  ngOnInit() {
  }

  // 查询数据
  search(){

  }
  // 重置查询表单
  initForm(){
    this.validateForm.reset();
  }
  currentPageDataChange(){

  }
}
