import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  isDisabled:boolean =true;

  constructor() { }

  ngOnInit(): void {
  }
  uploadImages(): void {
    this.isDisabled =false;
  }

  AddToCart(): void {

  }

}
