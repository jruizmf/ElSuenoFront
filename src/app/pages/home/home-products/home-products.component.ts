import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../../shared/data/products'; 
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/core/models';
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products: any = [];
  expandPrices:boolean = false;
  constructor(private _productService: ProductsService) { 
   this.getAll();
  }

  ngOnInit(): void { 

  }

  async  getAll(){
    await this._productService.getAll({}).then((x: any[]) => {
      console.log(x)
      this.products = x;
    })
  }

}
