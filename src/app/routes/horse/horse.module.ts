import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { HorseRoutingModule } from './horse-routing.module';

import { HorseActiviteComponent } from './activite/activite.component';
import { HorseFlowViewComponent } from './flowView/flowView.component';
import {NgxEchartsModule} from 'ngx-echarts';

const COMPONENTS = [
  HorseActiviteComponent,
  HorseFlowViewComponent
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [CommonModule, SharedModule, HorseRoutingModule,NgxEchartsModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class HorseModule {}
