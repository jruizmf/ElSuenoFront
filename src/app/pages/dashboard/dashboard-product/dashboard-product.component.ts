import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { productsDB } from 'src/app/shared/data/products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent  implements OnInit {
  view = 'list';

  products: any[] | undefined;
  constructor(private _productService : ProductsService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }
  async  getAll(){
    await this._productService.getAll({}).then((x: any[]) => {
      this.products = x;
    })
  }
  deleteProduct(_id: string){
    this._productService.delete(_id).subscribe( res => {
      window.location.reload();
      }, error => {
        Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
      }
    )
  }
  handleDenial(){

  }
  handleDismiss(event:any){
    
  }
}
