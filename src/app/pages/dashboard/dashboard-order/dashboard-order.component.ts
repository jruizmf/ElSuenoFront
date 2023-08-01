import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/models';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {
  orders: IOrder[]  = [];
  constructor(private _orderService: OrderService) {}
  ngOnInit(): void {
    this.getAll()
  }

  async  getAll(){
    await this._orderService.getAll({}).then((x: IOrder[]) => {
      console.log(x)
      this.orders = x;
    })
  }
}
