import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { DashboardUserFormComponent } from './dashboard-user-form/dashboard-user-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardUserPasswordEditorComponent } from './components/password-editor/password-editor.component';


@NgModule({
  declarations: [
    DashboardUserFormComponent,
    DashboardUserPasswordEditorComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forChild({ /* options */ }),
    DashboardUserRoutingModule,
    SharedModule, MatMenuModule
  ]
})
export class DashboardUserModule { }
