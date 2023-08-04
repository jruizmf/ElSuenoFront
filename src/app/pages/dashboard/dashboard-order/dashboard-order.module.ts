import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardOrderRoutingModule } from './dashboard-order-routing.module';
import { DashboardOrderFormComponent } from './dashboard-order-form/dashboard-order-form.component';


@NgModule({
  declarations: [
    DashboardOrderFormComponent
  ],
  imports: [
    CommonModule,
    DashboardOrderRoutingModule
  ]
})
export class DashboardOrderModule { }
