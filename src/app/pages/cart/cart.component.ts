import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IOrder } from 'src/app/core/models';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
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
  constructor(private router: Router, private _cartService: CartService, private _orderService: OrderService) {
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
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log(cart)
      this.itemQuantity[i] = event
      this.itemTotal[i] = this.cartItems[i].total * this.itemQuantity[i];
      console.log(cart)
    cart.items.forEach((item: any, index:number) => {
      this.itemQuantity[index] = 1;
      this.total.price = this.total.price + (item.total * this.itemQuantity[index])
      this.total.tax = (this.total.price * .15);
      this.total.total = this.total.price + this.total.tax
    });
  }
  createOrder():void{
    Swal.fire({
      title: 'Are you sure want to purchase?',
      text: 'You will not be able to cancel this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, purchase it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let order: IOrder = {
          quantity: 2040,
          total: this.total.price,
          isDelivery:false,
          orderItems: this.cartItems
      }
        this._orderService.save(order).subscribe((x:any) => {
          Swal.fire("Order Added", "This order was added successfully...", "success")
            localStorage.removeItem('cart')
            this.cartItems = []
            this.router.navigate(['products']);
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
  }

  removeItem(i:number){
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      this.cartItems.splice(i, 1);
      if(this.cartItems.length == 0){
        Swal.fire("Remove Item", "There is no items in cart, redirecting to Products...", "warning")
        localStorage.removeItem('cart')
        this.cartItems = []
        this.router.navigate(['products']);
      }
      this._cartService.sendNumber(this.cartItems.length);
      localStorage.setItem('cart', JSON.stringify(
        {items: this.cartItems}
      ));
    }
  }
}
