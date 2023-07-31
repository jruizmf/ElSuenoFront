import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];
  orders: any[] = [];
  itemQuantity: number[] = [];
  itemTotal: number[] = [];
  total: any = {
    price:0,
    discount:0,
    tax:0,
    total:0,
  }
  constructor(private router: Router) {
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log(cart)
      cart.items.forEach((item: any, index:number) => {
        this.itemTotal[index] = item.total
        this.itemQuantity[index] = 1;
        this.total.price = this.total.price + item.total
        this.total.tax = (this.total.price * .15);
        this.total.total = this.total.price + this.total.tax
      });
      this.cartItems =   cart.items
    }
  }

  ngOnInit(): void {
   
  }
  calculateTotals(event: any, i:number){
    console.log(event)
    console.log(event)
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log(cart)
      this.itemQuantity[i] = event
      this.itemTotal[i] = this.cartItems[i].total * this.itemQuantity[i]
    cart.items.forEach((item: any, index:number) => {
      
      this.itemQuantity[index] = 1;
      this.total.price = this.total.price + (item.total * this.itemQuantity[index])
      this.total.tax = (this.total.price * .15);
      this.total.total = this.total.price + this.total.tax
    });
  }
  removeItem(i:number){
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      this.cartItems.splice(i, 1);
      if(this.cartItems.length == 0){
        Swal.fire("Remove Item", "There is no items in cart, redirecting...", "success")
        localStorage.removeItem('cart')
        this.cartItems = []
        this.router.navigate(['products']);
      }

      localStorage.setItem('cart', JSON.stringify(
        {items: this.cartItems}
      ));
    }
  }
}
