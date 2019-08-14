import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorseActiviteComponent } from './activite/activite.component';
import { HorseFlowViewComponent } from './flowView/flowView.component';

const routes: Routes = [
  { path: 'activite', component: HorseActiviteComponent },
  { path: 'flowView', component: HorseFlowViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorseRoutingModule {}
