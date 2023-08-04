import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { IOrder } from 'src/app/core/models';
import { FileService } from 'src/app/core/services/file.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-dashboard-order-form',
  templateUrl: './dashboard-order-form.component.html',
  styleUrls: ['./dashboard-order-form.component.scss']
})
export class DashboardOrderFormComponent {
  orderID: any = "";
  order: any = {};

  constructor(private _orderService: OrderService, private dialog: MatDialog, private _uploadService: FileService,  private route : ActivatedRoute) { 
    this.orderID = this.route.snapshot.paramMap.get('term')
  }


  getOrder(){
    this._orderService.findByTerm(this.orderID).then((res:any) => {
      console.log(res)
      this.order = res;
    })  
  }

  ngOnInit(): void {
   this.getOrder();
  }
}
