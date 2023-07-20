import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models';
import { Observable, map } from 'rxjs';

const USER_API = 'http://localhost:3000/api/product/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getAll(filter: any): any {
    return this.http.get<any>(`${USER_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }
  save(product: IProduct): Observable<any> {
    return this.http.post<IProduct>(`${USER_API}create`,  product )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
  update(product: IProduct): Observable<any> {
    return this.http.patch<IProduct>(`${USER_API}${product?.slug}`,  product )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
  delete(product: IProduct): Observable<any> {
    return this.http.delete<IProduct>(`${USER_API}${product._id}` )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
}
