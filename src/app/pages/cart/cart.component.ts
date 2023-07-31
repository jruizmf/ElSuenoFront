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
        console.log(item)
        console.log(index)
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
  calculateTotals(event: any){
    console.log(event)
  }
  removeItem(i:number){
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      let cart = JSON.parse(localStorage.getItem('cart') || '{}');


      this.cartItems.splice(i, 1);
      if(this.cartItems.length == 0){
        Swal.fire("Remove Item", "There is no items in cart, redirecting...", "success")
        
        localStorage.removeItem('cart')
        this.cartItems = []
        this.router.navigate(['products']);

      }
      console.log(this.cartItems)
      localStorage.setItem('cart', JSON.stringify(
        {items: this.cartItems}
      ));
    }
    // localStorage.removeItem('cart')

    // this.cartItems = []
  }
}
