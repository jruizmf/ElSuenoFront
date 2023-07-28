import { Injectable } from '@angular/core';
import { IProductComposeOption } from '../models/productComposeOption';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const COMPOSE_OPTION_API = 'http://localhost:3000/api/compose-option/';

@Injectable({
  providedIn: 'root'
})
export class ComposeOptionService {

  public user: Observable<IProductComposeOption> = new Observable<IProductComposeOption>();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {

  }

  getAll(filter: any): any {
    return this.http.get<any>(`${COMPOSE_OPTION_API}all`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  findByTerm(term: string): any {
    return this.http.get<any>(`${COMPOSE_OPTION_API}${term}`).toPromise()
    .then((res: any) => {
      return res
    });
  }

  save(composeOption: IProductComposeOption): Observable<any> {
    return this.http.post<IProductComposeOption>(`${COMPOSE_OPTION_API}create`,  composeOption )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  update(_id: string, composeOption: IProductComposeOption): Observable<any> {
    return this.http.patch<IProductComposeOption>(`${COMPOSE_OPTION_API}${_id}`,  composeOption )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  delete(_id: string,): Observable<any> {
    return this.http.delete<IProductComposeOption>(`${COMPOSE_OPTION_API}${_id}` )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
}
