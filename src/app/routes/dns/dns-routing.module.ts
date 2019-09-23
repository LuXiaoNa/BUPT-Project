import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DnsHistoryComponent} from "./history/history.component";
import {DnsDetectionComponent} from "./detection/detection.component";


const routes: Routes = [
  { path: 'history', component:DnsHistoryComponent },
  { path: 'detection', component: DnsDetectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DnsRoutingModule {}
