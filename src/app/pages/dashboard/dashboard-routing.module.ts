import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { InventoryComponent } from './dashboard-inventory/inventory.component';
import { UserComponent } from './dashboard-user/user.component';
import { StoreAddressComponent } from './dashboard-store-address/store-address.component';



const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardIndexComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./dashboard-product/dashboard-product.module').then(m => m.DashboardProductModule)
  },
  {
    path: 'compose-option',
    loadChildren: () => import('./dashboard-compose-options/dashboard-compose-option.module').then(m => m.DashboardComposeOptionModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./dashboard-user/dashboard-user.module').then(m => m.DashboardUserModule)
  },
  {
    path: 'store-address',
    component: StoreAddressComponent
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./dashboard-saved-item/dashboard-saved-item.module').then(m => m.DashboardSavedItemModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./dashboard-profile/dashboard-profile.module').then(m => m.DashboardProfileModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./dashboard-order/dashboard-order.module').then(m => m.DashboardOrderModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
