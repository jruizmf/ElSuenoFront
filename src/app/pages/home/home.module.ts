import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeProductsComponent } from './home-products/home-products.component';
import { NgParticlesModule } from 'ng-particles';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [HomeComponent, HomeProductsComponent, CartComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgParticlesModule]
})
export class HomeModule {
}
