import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';

import { AuthGuardService  } from "./shared/guards/auth.guard";
import { RoleGuardService } from './shared/guards/role.guard';

const baseLayoutRouting: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'cart',
    component:CartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuardService],
    data: { 
      isDashboard: false, 
      isAuth: true
    }
  },
  {
    path: 'doc',
    loadChildren: () => import('./doc/doc.module').then(m => m.DocModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { 
      isDashboard: true
    }
  },{ 
    path: '**', 
    component: ErrorPageComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
