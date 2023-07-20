import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Auth } from '../models/auth';
import { IUser } from '../models/user';
import { Router } from '@angular/router';


const USER_API = 'http://localhost:3000/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user: Observable<IUser> = new Observable<IUser>();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    
  }

  getAll(filter: any): any {
    return this.http.get<any>(`${USER_API}all`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  register(user: IUser): Observable<any> {
    return this.http.post<IUser>(`${USER_API}register`, user)
            .pipe(map(async (u) => {
                localStorage.setItem('user', JSON.stringify(u));
                this.userSubject.next(u);
                return user;
            }));
  }
  save(user: IUser): Observable<any> {
    return this.http.post<IUser>(`${USER_API}create`,  user )
            .pipe(map(async (u: any) => {
                this.userSubject.next(u);
                return u;
            }));
  }
  update(user: IUser): Observable<any> {
    return this.http.patch<IUser>(`${USER_API}${user._id}`,  user )
            .pipe(map(async (u: any) => {
                this.userSubject.next(u);
                return u;
            }));
  }
  delete(user: IUser): Observable<any> {
    return this.http.delete<Auth>(`${USER_API}${user._id}` )
            .pipe(map(async (u: any) => {
                this.userSubject.next(u);
                return u;
            }));
  }
}