import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardProfileRoutingModule } from './dashboard-profile-routing.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePasswordEditorComponent } from './components/password-editor/password-editor.component';

@NgModule({
  declarations: [
    ProfileFormComponent,
    ProfilePasswordEditorComponent
  ],
  imports: [CommonModule, DashboardProfileRoutingModule, SharedModule ,MatMenuModule]
})
export class DashboardProfileModule {}
