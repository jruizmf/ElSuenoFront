import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { ProfileFormComponent } from './dashboard-profile/profile-form/profile-form.component';
import { ProductComponent } from './product/product.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UserComponent } from './user/user.component';
import { StoreAddressComponent } from './store-address/store-address.component';



const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardIndexComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'store-address',
    component: StoreAddressComponent
  },
  {
    path: 'my-orders',
    component: DashboardSavedItemComponent
  },
  {
    path: 'profile',
    loadChildren: () => import('./dashboard-profile/dashboard-profile.module').then(m => m.DashboardProfileModule)
  },
  {
    path: 'orders',
    component: DashboardOrderComponent
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
