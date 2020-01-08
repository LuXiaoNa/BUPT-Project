import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
import {
  FormBuilder,
} from '@angular/forms';
import {environment} from "@env/environment";
import * as echarts from 'echarts';

@Component({
  selector: 'app-hourse-flowView',
  styleUrls: ['./flowView.component.less'],
  templateUrl: './flowView.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorseFlowViewComponent implements OnInit,AfterViewInit {
   //流量视图
  @ViewChild('Flow',{static:true}) Flow:ElementRef;
  myChartFlow:any;
  //源端口
  @ViewChild('SrcPort',{static:true}) SrcPort:ElementRef;
  myChartSrc:any;
  /*目的端口*/
  @ViewChild('DesPort',{static:true}) DesPort:ElementRef;
  myChartDes:any;

  // 影响捕获报文数据图
   FlowOption:any;
  // 影响捕获报文数据图选框数据
  FlowSelect:any;
  // 影响捕获报文数据图选框数据源
  FlowOptionsDate=[];
  // 源端口选框数据源
  SrcPortTopSelect:any;
  SrcPortTopOptions=[];
  // 目的端口选框数据源
  DesPortOption:any;
  DesPortTopSelect:any;
  DesPortTopOptions=[];
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
  ) {}
 ngAfterViewInit(): void {
    this.SrcPortTopSelectSet();
    this.DesPortTopSelectSet();
    this.flowTimeSelectSet();
  }
  ngOnInit() {
    // 时间对象定义
    const timer = [
      {id: 1, name: '最近5分钟'},
      {id: 2, name: '最近1小时'},
      {id: 3, name: '最近24小时'},
    ];
   const TopOptions=[
      {id:10,name:'Top10'},
      {id:5,name:'Top5'},
      {id:3,name:'Top3'}
    ];
    // 设置警告图表单选框初始值
    this.getAlet(timer);
    this.getTop(TopOptions);
   /* this.flowTimeSelectSet();*/
  }
  getAlet(timer){
    this.FlowOptionsDate=timer;
    this.FlowSelect = 3;
  }
  getTop(TopOptions){
    this.SrcPortTopOptions=TopOptions;
    this.DesPortTopOptions=TopOptions;
    this.SrcPortTopSelect=10;
    this.DesPortTopSelect=10;
  }
  /*重新渲染图表*/
  changeTime(type){
    switch(type){
      case 'flow':
        this.flowTimeSelectSet();
        break;
      case 'SrcPort':
        this.SrcPortTopSelectSet();
        break;
      case 'DesIp':
        this.DesPortTopSelectSet();
        break;
    }
  }
  timeSet(timer) {
    let stime;
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
    }
    return {
      stime: stime._d.getTime(),
    };
  }
  /*流量视图*/
  flowTimeSelectSet() {
    this.myChartFlow = echarts.init(this.Flow.nativeElement);
    this.myChartFlow.setOption({
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:[],
        textStyle: {
          color: '#FF3030',
        }
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
          data:[],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#FF3030',
            }
          },
          axisLabel: {
            color: '#FF3030'
          }
        }

      ],
      yAxis : [
        {
          name:'流量(M)',
          type : 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#FF3030',
            }
          },
        }
      ],
      series : [
        {
          name:'DNS',
          type:'bar',
          stack: '协议',
          data:[]
        },
        {
          name:'HTTP',
          type:'bar',
          stack: '协议',
          data:[]
        },
        {
          name:'UNKNOUW',
          type:'bar',
          stack: '协议',
          data:[]
        }
      ]
    });
    const time = this.timeSet(this.FlowSelect);
    const params={
      time:time.stime
    };
    console.log(params)
    this.myChartFlow.showLoading();
    this.http.get(environment.PUBLIC_URL+'/trojan/view/flow',params).subscribe((req:any)=>{
      if (req.data!=null){
        const xFlowData=[];
        let yProtocalData=[];
        const pro1=[];
        const pro2=[];
        const pro3=[];
        for (let i=req.data.length-1;i>-1;i--){
          yProtocalData=req.data[0].protocol;
          const day=moment(Number(req.data[i].time)).format('MM-DD HH:mm:ss');
          xFlowData.push(day);
          pro1.push(req.data[i].size[0]);
          pro2.push(req.data[i].size[1]);
          pro3.push(req.data[i].size[2])
        }
        this.myChartFlow.setOption({
          legend: {
            data:yProtocalData,
          },
          xAxis : [
            {
              data: xFlowData
            }
          ],
          series : [
            {
              name:'DNS',
              type:'bar',
              stack: '协议',
              data:pro1
            },
            {
              name:'HTTP',
              type:'bar',
              stack: '协议',
              data:pro2
            },
            {
              name:'UNKNOUW',
              type:'bar',
              stack: '协议',
              data:pro3
            }
          ]
        });
      }
      this.myChartFlow.hideLoading();
    });
  }
  // 恶意源端口柱状图加载
  SrcPortTopSelectSet(){
    this.myChartSrc = echarts.init(this.SrcPort.nativeElement);
    this.myChartSrc.setOption({
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
        type: 'category',
        data:[],
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#528B8B',
          }
        },
        axisLabel: {
          color: '#528B8B'
        }

      },
      yAxis: {
        name:'数量',
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#528B8B',
          }
        },
      },
      series: [
        {
          name: '访问次数',
          type: 'bar',
          data: [],
          stack: '访问次数',
          color:'#528B8B'
        },
      ]
    });
    const params={
      top: this.SrcPortTopSelect,
    };
    this.myChartSrc.showLoading();
    this.http.get(environment.PUBLIC_URL+'/trojan/view/srcPort',params).subscribe((req:any)=> {
      if(req.data != null) {
        console.log();
          const ySrcDataNumber = [];
          const xSrcDataPort = [];
          for (const i of req.data) {
            ySrcDataNumber.push(i.number);
            xSrcDataPort.push(i.port);
          }
          this.myChartSrc.setOption({
            xAxis: {
              data:xSrcDataPort,
            },
            series: [
              {
                data: ySrcDataNumber,
              },
            ]
          });
      }
      this.myChartSrc.hideLoading();
    });
  }
  // 恶意目的端口柱状图加载
  DesPortTopSelectSet(){
    this.myChartDes = echarts.init(this.DesPort.nativeElement);
    this.myChartDes.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data:[],
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#7D9EC0',
          }
        },
        axisLabel: {
          color: '#7D9EC0'
        }

      },
      yAxis: {
        name:'访问次数',
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#7D9EC0',
          }
        },
      },
      series: [
        {
          name: '访问次数',
          type: 'bar',
          data: [],
          stack: '访问次数',
          color:'#7D9EC0'
        },
      ]
    });
    this.myChartDes.showLoading();
    const params={
      top:this.DesPortTopSelect,
    };
    this.http.get(environment.PUBLIC_URL+'/trojan/view/desPort',params).subscribe((req:any)=> {
      if (req.data != null) {
        console.log();
        const yDesDataNumber = [];
        const xDesDataPort = [];
        for (const i of req.data) {
          yDesDataNumber.push(i.number);
          xDesDataPort.push(i.port);
        }
        this.myChartDes.setOption({
          xAxis: {
            data:xDesDataPort,
          },
          series: [
            {
              data: yDesDataNumber,
            },
          ]
        });
      }
      this.myChartDes.hideLoading();
    });
  }
}
