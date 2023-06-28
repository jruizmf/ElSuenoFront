import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardProfileRoutingModule } from './dashboard-profile-routing.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileFormComponent
  ],
  imports: [CommonModule, DashboardProfileRoutingModule,SharedModule, MatMenuModule]
})
export class DashboardProfileModule {}
