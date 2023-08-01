import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/models';
import { OrderService } from 'src/app/core/services/order.service';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';

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
