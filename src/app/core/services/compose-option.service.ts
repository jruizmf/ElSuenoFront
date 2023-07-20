import { Injectable } from '@angular/core';
import { IProductComposeOption } from '../models/productComposeOption';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const USER_API = 'http://localhost:3000/api/compose-option/';

@Injectable({
  providedIn: 'root'
})
export class ComposeOptionService {

  public user: Observable<IProductComposeOption> = new Observable<IProductComposeOption>();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    
  }

  getAll(filter: any): any {
    return this.http.get<any>(`${USER_API}all`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  register(user: IProductComposeOption): Observable<any> {
    return this.http.post<IProductComposeOption>(`${USER_API}register`, user)
            .pipe(map(async (u) => {
                return u;
            }));
  }
  save(user: IProductComposeOption): Observable<any> {
    return this.http.post<IProductComposeOption>(`${USER_API}create`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  update(user: IProductComposeOption): Observable<any> {
    return this.http.patch<IProductComposeOption>(`${USER_API}${user._id}`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  delete(user: IProductComposeOption): Observable<any> {
    return this.http.delete<IProductComposeOption>(`${USER_API}${user._id}` )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
}
