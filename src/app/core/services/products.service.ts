import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models';
import { Observable, map } from 'rxjs';

const PRODUCT_API = 'http://localhost:3000/api/product/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(filter: any): any {
    return this.http.get<any>(`${PRODUCT_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  findByTerm(term: string): any {
    return this.http.get<any>(`${PRODUCT_API}${term}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  save(product: IProduct): Observable<any> {
    return this.http.post<IProduct>(`${PRODUCT_API}create`,  product )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
  update(index:string, product: IProduct): Observable<any> {
    return this.http.patch<IProduct>(`${PRODUCT_API}${index}`,  product )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
  delete(_id: string): Observable<any> {
    return this.http.delete(`${PRODUCT_API}${_id}` )
            .pipe(map(async () => {
                return true;
            }));
  }
}
