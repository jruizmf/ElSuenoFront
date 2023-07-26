import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComposeOptionsComponent } from './dashboard-compose-options.component';
import { DashboardComposeOptionsFormComponent } from './dashboard-compose-options-form/dashboard-compose-options-form.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComposeOptionsComponent
  }, {
    path: 'save',
    component: DashboardComposeOptionsFormComponent
  },
  {
    path: 'edit/:term',
    component: DashboardComposeOptionsFormComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComposeOptionsRoutingModule {}
