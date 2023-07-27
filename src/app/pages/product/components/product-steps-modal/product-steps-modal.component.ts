import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
export interface cart {
  productId: string,
  productName: string,
  slug: string,
  image: string,
  price: Price,
  quantity: number,
  total: number,
  optionComposes: OptionCompose[]
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

export interface Size{
  sizeType: string, 
  sizeValue: number, 
  sizeUnit: string
}



export interface Price {
  sizeTitle: string,
  clientPrice: string,
  frequentPrice: string,
  federalPrice: string,
  sizes: Size[]
}
export interface SalesForOrder {
  decrementClient: number,
  decrementFederal: number,
  decrementFrequent: number,
  unitSale: number,
  weight:number
}

@Component({
  selector: 'app-product-steps-modal',
  templateUrl: './product-steps-modal.component.html',
  styleUrls: ['./product-steps-modal.component.scss']
})
export class ProductStepsModalComponent {
  @Input() options: any;
  @Output() emitAttributes = new EventEmitter();
  isLinear = false;
  isLogged: boolean = false;

  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.options = data.data[0];
  }

  addInputValues(event: any, i: number, _i: number){
    console.log(event)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit():void {
    console.log(this.options)
    this.emitAttributes.emit(this.options);
    this.dialogRef.close(this.options);
  }
}
