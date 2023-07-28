import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../../shared/data/products';
import { ProductsService } from 'src/app/core/services/products.service';

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
  constructor(private _productService : ProductsService) {
    this.getAll();
  }


  async  getAll(){
    await this._productService.getAll({}).then((x: any[]) => {
      console.log(x)
      this.products = x;
    })
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.products = productsDB.Product;
      this.isLoaded = true
    }, 8000)
  }
}
