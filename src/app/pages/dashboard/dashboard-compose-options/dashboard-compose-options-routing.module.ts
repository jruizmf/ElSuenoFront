import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComposeOptionsComponent } from './dashboard-compose-options.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComposeOptionsComponent
  },
  // {
  //   path: 'save',
  //   component: DashboardProductFormComponent
  // },
  // {
  //   path: 'edit/:term',
  //   component: DashboardProductFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComposeOptionsRoutingModule {}
