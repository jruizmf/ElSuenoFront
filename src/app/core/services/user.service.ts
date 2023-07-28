import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Auth } from '../models/auth';
import { IUser } from '../models/user';
import { Router } from '@angular/router';


const USER_API = 'http://localhost:3000/api/admin/users/';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: Observable<IUser> = new Observable<IUser>();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {

  }

  getAll(filter: any): any {
    return this.http.get<any>(`${USER_API}all`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  findOne(string: string): any {
    return this.http.get<any>(`${USER_API+string}`).toPromise()
    .then((res: any) => {
      return res
    });
  }

  register(user: IUser): Observable<any> {
    return this.http.post<IUser>(`${USER_API}register`, user)
            .pipe(map(async (u) => {
                return u;
            }));
  }
  save(user: IUser): Observable<any> {
    return this.http.post<IUser>(`${USER_API}create`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  update(_id:string, user: IUser): Observable<any> {
    return this.http.patch<IUser>(`${USER_API}${_id}`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  delete(_id:string): Observable<any> {
    return this.http.delete<Auth>(`${USER_API}${_id}` )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
}
