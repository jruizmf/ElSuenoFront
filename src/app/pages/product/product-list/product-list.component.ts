import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../../shared/data/products';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean |undefined;
  advanceSearchExpanded: boolean = false;
  products: any = [];
  expandPrices:boolean = false;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.products = productsDB.Product;
      this.isLoaded = true
    }, 8000)
  }
}
