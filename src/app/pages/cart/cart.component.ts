import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];
  orders: any[] = [];

  constructor() {
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      this.cartItems =   cart.items
    }
  }

  ngOnInit(): void {
   
  }

  removeItem(i:number){
    localStorage.removeItem('cart')
    this.cartItems = []
  }
}
