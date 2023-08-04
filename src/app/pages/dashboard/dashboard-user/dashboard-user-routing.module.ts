import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUserFormComponent } from './dashboard-user-form/dashboard-user-form.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserComponent
  },
  {
    path: 'save',
    component: DashboardUserFormComponent
  },
  {
    path: 'edit/:term',
    component: DashboardUserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
