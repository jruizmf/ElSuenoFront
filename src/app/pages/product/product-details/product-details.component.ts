import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { IProduct } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  isDisabled:boolean =true;
  product: any;
  slug: any;
  selectedPrice:string;
  constructor(private _productService: ProductsService, private route : ActivatedRoute, private _authService: AuthService) { 
    this.selectedPrice = "0"
    this.slug = this.route.snapshot.paramMap.get('slug')
    console.log(this.slug)
    this.getProduct(this.slug);
  }

  ngOnInit(): void {
    console.log(this._authService.getUser())
  }

  getProduct(slug:string) : void{
    this._productService.findByTerm(slug).then((res: any) => {
      console.log( res)
      this.product = res.product;
    })

  }
  selectPrice(item: any){
    console.log(item)
    this._authService.getUser()
    this.selectedPrice = "200";
  }
  uploadImages(): void {
    this.isDisabled =false;
  }

  AddToCart(): void {

  }

}
