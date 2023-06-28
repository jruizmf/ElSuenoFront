import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { productsDB } from 'src/app/shared/data/products';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from '../../product/product-routing.module';



@NgModule({
  declarations: [
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule, ProductRoutingModule, SharedModule
  ]
})
export class ProductModule{
}
