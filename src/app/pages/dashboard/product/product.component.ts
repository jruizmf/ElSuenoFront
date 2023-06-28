import { Component, OnInit } from '@angular/core';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit {
  view = 'list';

  products: any[] | undefined;
  constructor() {}

  ngOnInit(): void {
    this.products = productsDB.Product;
  }

}
