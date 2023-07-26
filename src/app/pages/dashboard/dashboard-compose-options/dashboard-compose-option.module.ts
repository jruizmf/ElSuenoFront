import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productsDB } from 'src/app/shared/data/products';
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComposeOptionsRoutingModule } from './dashboard-compose-options-routing.module';
import { DashboardComposeOptionsComponent } from './dashboard-compose-options.component';
import { DashboardComposeOptionsFormComponent } from './dashboard-compose-options-form/dashboard-compose-options-form.component';



@NgModule({
  declarations: [
    DashboardComposeOptionsComponent,
    DashboardComposeOptionsFormComponent
  ],
  imports: [
    CommonModule, 
    SweetAlert2Module.forChild({ /* options */ }),
    DashboardComposeOptionsRoutingModule,  
    SharedModule
  ]
})
export class DashboardComposeOptionModule{
}
