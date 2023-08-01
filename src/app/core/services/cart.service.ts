import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Subject<number>();
  constructor() { }
  sendNumber(number:number){
    this.cart.next(number);
  }
  getNumber():Observable<number>{
    return this.cart.asObservable();
  }
}
