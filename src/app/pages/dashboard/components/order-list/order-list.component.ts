import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
 @Input() orders: any[] = [];

  constructor() {}

  ngOnInit(): void {
  }

}
