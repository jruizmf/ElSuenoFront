import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOrderFormComponent } from './dashboard-order-form/dashboard-order-form.component';
import { DashboardOrderComponent } from './dashboard-order.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardOrderComponent
  },
  {
    path: 'details/:term',
    component: DashboardOrderFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardOrderRoutingModule { }
