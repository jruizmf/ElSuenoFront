import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProductComponent } from './dashboard-product.component';
import { DashboardProductFormComponent } from './dashboard-product-form/dashboard-product-form.component';
import { ProductDetailComponent } from './dashboard-product-detail/product-detail.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardProductComponent
  },
  {
    path: 'save',
    component: DashboardProductFormComponent
  },
  {
    path: 'edit/:term',
    component: DashboardProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardProductRoutingModule {}
