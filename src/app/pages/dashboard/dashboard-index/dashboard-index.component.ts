import { Component, OnInit } from '@angular/core';
import { IOrder, IProduct } from 'src/app/core/models';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {
  productCounters:any = {
    inStorck: 0,
    outOfStock:0,
    lowExistence:0,
    total:0
  }

  orderCounters:any = {
    noPaid: 0,
    completed:0,
    onGoing:0,
    total:0,
    shipping:0
  }

  usersCounter:number= 0;

  constructor(private _orderService: OrderService, private _productService: ProductsService, private _userService: UserService) {}

  ngOnInit(): void {
    this.getProductCounters();
    this.getOrderCounters();
    this.getUserCounters();
  }

  getProductCounters():void{
    let total = 0
    this._productService.getAll({}).then((x: IProduct[]) => {
      console.log(x)
      this.productCounters.total = x.length;
      this.productCounters.inStock = x.length
    })
  }
  getOrderCounters():void{
    let total = 0
    this._orderService.getAll({}).then((x: any[]) => {
      this.orderCounters.total = x.length;
      this.orderCounters.noPaid = typeof x.find(o => o.isPaid != true) != 'undefined' ? x.find(o => o.isPaid != true).length : 0;
      this.orderCounters.completed = typeof x.find(o => o.orderState != 'completed') != 'undefined' ? x.find(o => o.orderState != 'completed').length : 0;
      this.orderCounters.onGoing = typeof x.find(o => o.orderState != 'processing') != 'undefined' ? x.find(o => o.orderState != 'processing').length : 0;
      this.orderCounters.shipping = typeof x.find(o => o.isPaid == true) != 'undefined' ? x.find(o => o.isPaid == true) .length : 0
    
    })
  }
  getUserCounters():void{
    this._userService.getAll({}).then((x: any[]) => {
      this.usersCounter = x.length;
     })
  }
}
