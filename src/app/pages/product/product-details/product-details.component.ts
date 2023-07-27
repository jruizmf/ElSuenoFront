import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductStepsModalComponent } from '../components/product-steps-modal/product-steps-modal.component';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  isDisabled:boolean =true;
  product: any;
  options: any;
  slug: any;
  size: any;
  selectedPrice:string;
  selectedImage: string = 'assets/images/No_image_available.png';

  constructor(private _productService: ProductsService, private route : ActivatedRoute, private _authService: AuthService, private dialog: MatDialog) { 
    this.selectedPrice = "0"
    this.slug = this.route.snapshot.paramMap.get('slug')
  }

  ngOnInit(): void {
    console.log(this._authService.getUser())
    this.isDisabled = !this._authService.isAuthenticated();
    this.getProduct(this.slug);
  }
  selectImage(i: number){
    this.selectedImage = this.product.images[i]
  }
  getProduct(slug:string) : void{
    this._productService.findByTerm(slug).then((res: any) => {
      this.product = res.product;
      this.options = res.options;
      if (typeof this.product != 'undefined') {
        if (typeof this.product.images != 'undefined') {
            
          this.selectedImage = this.product.images[0];
        } 
        if (typeof this.product.attributes != 'undefined') {
          this.selectPrice(this.product.attributes[0].prices[0])
        }
      }

    })

  }
  selectPrice(item: any){
    // this.product.attributes[0].prices[0]
    let role =  typeof  this._authService.getRole() as string
    this.size = item;
    console.log(item)
    let price = "0";
    if(role == "client"){
      price = item.clientPrice;
    }else if(role == "frequent"){
      price = item.frequentPrice;
    }else if(role == "federal"){
      price = item.federalPrice;
    }else{
      price = item.federalPrice;
    }
    this.selectedPrice = price;
  }
  uploadImages(): void {
    this.isDisabled =false;
  }

  AddToCart(): void {

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductStepsModalComponent, {
      data: {
        data: this.options
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.product.attributes = result;
      }
    });
  }
}
