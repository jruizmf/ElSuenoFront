import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProfileComponent } from './dashboard-profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardProfileComponent
  },
  {
    path: 'save',
    pathMatch: 'full',
    component: ProfileFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardProfileRoutingModule {}
