import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { InventoryComponent } from './dashboard-inventory/inventory.component';
import { UserComponent } from './dashboard-user/user.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardSavedItemComponent,
    DashboardProfileComponent,
    DashboardOrderComponent,
    InventoryComponent,
    UserComponent,
    OrderListComponent,
  ],
  imports: [CommonModule, SweetAlert2Module.forChild({ /* options */ }), DashboardRoutingModule, SharedModule, MatMenuModule]
})
export class DashboardModule {}
