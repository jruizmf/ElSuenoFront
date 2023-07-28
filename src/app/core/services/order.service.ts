import { Injectable } from '@angular/core';
import { IOrder } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const ORDER_API = 'http://localhost:3000/api/admin/orders/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(filter: any): any {
    return this.http.get<any>(`${ORDER_API}all`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  save(order: IOrder): Observable<any> {
    return this.http.post<IOrder>(`${ORDER_API}create`,  order )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  update(order: IOrder): Observable<any> {
    return this.http.patch<IOrder>(`${ORDER_API}${order?._id}`,  order )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  delete(order: IOrder): Observable<any> {
    return this.http.delete<IOrder>(`${ORDER_API}${order._id}` )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }
}
