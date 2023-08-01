import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductStepsModalComponent } from '../components/product-steps-modal/product-steps-modal.component';
import { IProduct } from 'src/app/core/models';
import { FileService } from 'src/app/core/services/file.service';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/core/services/cart.service';

export interface cart {
  productId: string,
  productName: string,
  slug: string,
  image: string,
  price: Price | undefined,
  quantity: number,
  total: number,
  optionComposes: OptionCompose[]
}
export interface Price {
  sizeTitle: string,
  clientPrice: string,
  frequentPrice: string,
  federalPrice: string,
  sizes: Size[]
}
export interface PriceItem {
  sizeTitle: string,
  price: number,
  sizes: Size[]
}
export interface Size{
  sizeType: string, 
  sizeValue: number, 
  sizeUnit: string
}
export interface OptionCompose {
  productComposeId: string,
  values: Value[],
  increment: number
}

export interface Value {
  valueName: string,
  value: string
}
export interface SalesForOrder {
  decrementClient: number,
  decrementFederal: number,
  decrementFrequent: number,
  unitSale: number,
  weight:number
}
@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  isDisabled:boolean =true;
  cartItem: any;
  product: any;
  options: any;
  slug: any;
  size: any;
  salesForOrderPermits: any[] = [];
  salesForOrderPermit: any | undefined;
  selectedPrice:number;
  price: PriceItem | undefined;
  selectedImage: string = 'assets/images/No_image_available.png';

  constructor(private _productService: ProductsService, private router: Router, private _cartService: CartService, private _fileService: FileService, private route : ActivatedRoute, private _authService: AuthService, private dialog: MatDialog) { 
    this.selectedPrice = 0
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.cartItem = {
      productId: "",
      productName: "",
      slug: this.slug,
      image: "",
      price: this.price,
      quantity: 0,
      total: 0,
      optionComposes: []

    }
  }

  ngOnInit(): void {
    this.isDisabled = !this._authService.isAuthenticated();
    this.getProduct(this.slug);
    this.price = this.product.attributes[0].prices[0];
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
          this.salesForOrderPermits = this.product.attributes[0].salesForOrderPermit;
          this.selectSalesForOrderPermit(this.product.attributes[0].salesForOrderPermit[0])
        }
      
      }

    })

  }
  selectPrice(item: any){
   
    let role =  this._authService.getRole() as string
    this.size = item;
    console.log(role)
    let price: number = 0;
    if(role == "client"){
      price = item.clientPrice;
    }else if(role == "frequent"){
      price = item.frequentPrice;
    }else if(role == "federal"){
      price = item.federalPrice;
    }else{
      price = item.federalPrice;
    }
    let sizes = item.sizes.map((x:any) =>{
      delete x._id
      return x;
    })
    this.price = {
      sizeTitle:item.sizeTitle,
      sizes: sizes,
      price: price
    };
    
    this.selectedPrice = price;
  }
  selectSalesForOrderPermit(item: any){
    this.salesForOrderPermit = item;
    this.cartItem.quantity = item.unitSale;
  }
  uploadImages(): void {
    this.isDisabled =false;

  }

  selectQuantity(event:any){
    let selected = this.salesForOrderPermits.find(x=> x.unitSale == event);
   
    let role =  this._authService.getRole() as string

    let decrement = 0;
    if(role == "client"){
      decrement = selected.decrementClient;
    }else if(role == "frequent"){
      decrement = selected.decrementFrequent;
    }else if(role == "federal"){
      decrement = selected.decrementFederal;
    }else{
      decrement = selected.decrementFederal;
    }
    
   this.selectedPrice = this.selectedPrice - decrement;
    this.cartItem.quantity = event;
  }
  openDialog(): void {
    if (this.cartItem.quantity == 0) {
      Swal.fire('Quantity not added..', 'Please select the quantity of products!', 'warning')
      return;
    }
    this.cartItem = {
      productId: this.product._id,
      productName: this.product.productName,
      slug: this.product.slug,
      image: this.product.images[0],
      price: this.price,
      quantity: this.cartItem.quantity,
      total: this.selectedPrice,
      optionComposes: []
    }
    const dialogRef = this.dialog.open(ProductStepsModalComponent, {
      data: {
        data: this.options,
        cartItem: this.cartItem
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log("result")
      if (typeof result != 'undefined') {
        let cartString  = localStorage.getItem('cart')
        let cart: any = { items:[] }
          /* let images: any[] = [];
    if(this.images.length > 0){
      for (let i = 0; i < this.images.length; i++) {
        if (typeof this.images[i] != 'string') {
          this._uploadService.upload(this.images[i]).then((res: any) => {
            images[i] = res;
            this.user.avatar = res
          })
        } else {
          images[i] = this.images[i]
        }
      }
    } */
        this.cartItem.optionComposes = result;

        if(cartString != null){
          cart = JSON.parse(cartString)
          cart.items.push(this.cartItem)
          localStorage.setItem('cart', JSON.stringify(
            {items: cart.items}
          ));
            
          this._cartService.sendNumber(cart.items.length);
          this.router.navigate(['products']);
        } else{
          this._cartService.sendNumber(1);
          localStorage.setItem('cart', JSON.stringify(
            {items: [this.cartItem]}
          ));
      
          this.router.navigate(['products']);
        }
        
      }
    });
  }

}
