import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { DnsRoutingModule } from './dns-routing.module';

import {NgxEchartsModule} from 'ngx-echarts';
import {DnsHistoryComponent} from "./history/history.component";
import {DnsDetectionComponent} from "./detection/detection.component";

const COMPONENTS = [
  DnsHistoryComponent,
  DnsDetectionComponent
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [CommonModule, SharedModule, DnsRoutingModule,NgxEchartsModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class DnsModule {}
