import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {environment} from "@env/environment";

@Component({
  selector: 'app-hourse-flowView',
  styleUrls: ['./flowView.component.less'],
  templateUrl: './flowView.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorseFlowViewComponent implements OnInit {
  //影响捕获报文数据图
   FlowOption:any;
  //影响捕获报文数据图选框数据
  FlowSelect:any;
  //影响捕获报文数据图选框数据源
  FlowOptionsDate=[];

  listOfParentData: any[] = [];
  listOfChildrenData: any[] = [];
  xFlowData=[];
  yFlowData=[];
  yProtocalData=[];

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // 时间对象定义
    const timer = [
      { id: 1, name: '最近5分钟' },
      { id: 2, name: '最近1小时' },
      { id: 3, name: '最近24小时' },
      /*{ id: 4, name: '最近7天' },*/
    ];
    //设置警告图表单选框初始值
    this.getAlet(timer);

    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: '192.168.32.1',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '172.168.1.1',
      });
    }
  }
  getAlet(timer){
    this.FlowOptionsDate=timer;
    this.FlowSelect = 1;
  }
  timeSet(timer) {
    let stime;
    let etime = moment();
    switch (timer) {
      case 1:
        stime = moment().subtract(5, 'minutes');
        break;
      case 2:
        stime = moment().subtract(1, 'hours');
        break;
      case 3:
        stime = moment().subtract(1, 'days');
        break;
      case 4:
        stime = moment().subtract(7, 'days');
        break;
    }
    return {
      stime: stime['_d'].getTime(),
      etime: etime['_d'].getTime(),
    };
  }
/*  FlowOption = {
  /!*  title: {
      text: '流量视图'
    },*!/
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data:['TCP','UDP','ICMP','POP3','IP','LOOP','BPQ','DEC','FTP']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['周一','周二','周三','周四','周五','周六','周日']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'TCP',
        type:'bar',
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:'UDP',
        type:'bar',
        stack: '流量',
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'ICMP',
        type:'bar',
        stack: '流量',
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'POP3',
        type:'bar',
        stack: '流量',
        data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
        name:'IP',
        type:'bar',
        data:[862, 1018, 964, 1026, 1679, 1600, 1570],
      },
      {
        name:'LOOP',
        type:'bar',
        barWidth : 5,
        stack: '流量',
        data:[620, 732, 701, 734, 1090, 1130, 1120]
      },
      {
        name:'BPQ',
        type:'bar',
        stack: '流量',
        data:[120, 132, 101, 134, 290, 230, 220]
      },
      {
        name:'DEC',
        type:'bar',
        stack: '流量',
        data:[60, 72, 71, 74, 190, 130, 110]
      },
      {
        name:'FTP',
        type:'bar',
        stack: '流量',
        data:[62, 82, 91, 84, 109, 110, 120]
      }
    ]
  };*/
  changeTime() {
    let time = this.timeSet(this.FlowSelect);
    let params={
      time:time.stime
    };
    console.log(time.stime)
    this.http.get(environment.PUBLIC_URL+'/trojan/view/flow',params).subscribe((req:any[])=>{
      if(req['data']!=null){
        for (let i=0;i<req['data'].length;i++){
          this.yProtocalData.push(req['data'][i]['protocal']);
          var day=moment(Number(req['data'][i]['time'])).format('MM-DD HH:mm:ss');
          this.xFlowData.push(day);
        }
        console.log(req['data']);
        console.log(this.yProtocalData);
        console.log(this.xFlowData);
      }
    });
    this.FlowOption = {
      /*  title: {
          text: '流量视图'
        },*/
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['TCP','UDP','ICMP','POP3','IP','LOOP','BPQ','DEC','FTP']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'TCP',
          type:'bar',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'UDP',
          type:'bar',
          stack: '流量',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'ICMP',
          type:'bar',
          stack: '流量',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'POP3',
          type:'bar',
          stack: '流量',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'IP',
          type:'bar',
          data:[862, 1018, 964, 1026, 1679, 1600, 1570],
        },
        {
          name:'LOOP',
          type:'bar',
          barWidth : 5,
          stack: '流量',
          data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name:'BPQ',
          type:'bar',
          stack: '流量',
          data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
          name:'DEC',
          type:'bar',
          stack: '流量',
          data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
          name:'FTP',
          type:'bar',
          stack: '流量',
          data:[62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
  }
}
