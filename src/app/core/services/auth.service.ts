import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Auth } from '../models/auth';
import { IUser } from '../models/user';
import { Router } from '@angular/router';


const AUTH_API = 'http://localhost:3000/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user: Observable<IUser> = new Observable<IUser>();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    
  }

  login(auth: Auth): Observable<any> {
    return this.http.post<Auth>(`${AUTH_API}login`,  auth )
            .pipe(map(async (res: any) => {
              localStorage.setItem('user', JSON.stringify(res.user));
              localStorage.setItem('token', JSON.stringify(res.token));
                this.userSubject.next(res.user);
                return res;
            }));
  }

  register(user: any): Observable<any> {

    return this.http.post<IUser>(`${AUTH_API}register`, user)
            .pipe(map(async (u) => {
                localStorage.setItem('user', JSON.stringify(u));
                this.userSubject.next(u);
                return user;
            }));
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  // }

  logout():void {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    this.router.navigate(['/']);
  }
  getUser():IUser{
    let user:IUser = {addresses: []}
    if(typeof localStorage.getItem('user') == 'string'){
      let userString: any = localStorage.getItem('user');
      
      let userStored = JSON.parse(userString)
      user = userStored;
    }
    return user;
  }

  getRole(): string{
    let role:string = ""
    if(typeof localStorage.getItem('user') == 'string'){
      let userString: any = localStorage.getItem('user');
      
      let userStored = JSON.parse(userString);
    
      if (typeof userStored.roles[0] != 'undefined') {
        let tempRole: string = userStored.roles[0];
        userStored.roles.forEach((r:string) => {
          console.log(r)
          if(role == 'admin'){
            tempRole = r;
          }
        });
        role = tempRole;
      };
    }
    console.log(role)
    return role;
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}