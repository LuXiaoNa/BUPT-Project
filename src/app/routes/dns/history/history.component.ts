import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
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
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.total=4
  }
  listOfDisplayData=[
    {
      detectime:1562921324343,
      detecnums:20,
      Domainname:"服务器1",
      Domainip:"192.168.32.1"
    },
    {
      detectime:1563921324343,
      detecnums:30,
      Domainname:"服务器2",
      Domainip:"192.168.32.3"
    },
    {
      detectime:1564921324343,
      detecnums:40,
      Domainname:"服务器3",
      Domainip:"192.168.32.2"
    },
  ];

  refreshStatus(){
    /*this.search();*/
  }
  currentPageDataChange(){

  }
}
