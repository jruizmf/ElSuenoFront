import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isDashboard = route.data['isDashboard'];
    const isAuthRoute = route.data['isAuth'];
    
    if(isDashboard){
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['auth/login']);
        return false;
      }
    } else{
      if (!this.auth.isAuthenticated()) {
        if (!isAuthRoute) {
        
          this.router.navigate(['']);
          return false;
        }
        
      }
    }
    
    return true;
  }
}