import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent  implements OnInit {
  view = 'list';

  products: any[] | undefined;
  constructor(private _productService : ProductsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }
  async  getAll(){
    await this._productService.getAll({}).then((x: any[]) => {
      console.log(x)
      this.products = x;
    })
  }
  deleteProduct(event:any, slug: any){
    
  }
  handleDenial(){}
  handleDismiss(event:any){}
}
