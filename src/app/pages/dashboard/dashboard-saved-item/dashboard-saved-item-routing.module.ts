import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSavedItemFormComponent } from './dashboard-saved-item-form/dashboard-saved-item-form.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardSavedItemComponent
  },
  {
    path: 'edit/:term',
    component: DashboardSavedItemFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSavedItemRoutingModule { }
