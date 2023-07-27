import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProductComponent } from './dashboard-product.component';
import { DashboardProductFormComponent } from './dashboard-product-form/dashboard-product-form.component';
import { productsDB } from 'src/app/shared/data/products';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardProductRoutingModule } from './dashboard-product-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProductAttributeStepperComponent } from 'src/app/pages/dashboard/dashboard-product/components/product-attribute-stepper/product-attribute-stepper.component';



@NgModule({
  declarations: [
    DashboardProductComponent,
    DashboardProductFormComponent,
    ProductAttributeStepperComponent
  ],
  imports: [
    CommonModule, SweetAlert2Module.forChild({ /* options */ }), DashboardProductRoutingModule,  SharedModule
  ]
})
export class DashboardProductModule{
}
