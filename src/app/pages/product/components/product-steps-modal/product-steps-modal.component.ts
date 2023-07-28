import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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
  selector: 'app-product-steps-modal',
  templateUrl: './product-steps-modal.component.html',
  styleUrls: ['./product-steps-modal.component.scss']
})
export class ProductStepsModalComponent {
  @Input() cartItem: any;
  @Input() options: any;
  @Output() emitAttributes = new EventEmitter();
  isLinear = false;
  isLogged: boolean = false;
  valuesList: any[] = [];

  composeOptions: any[] = [];

  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _authService: AuthService, private router : Router) {
      this.options = data.data[0];
      this.cartItem = data.cartItem;
  }

  addInputValues(event: any, index:any, optionIndex:any){
    this.composeOptions[index] = {
      productComposeId: this.options.composeOptions[index]._id,
      values: [],
      increment: this.validateIncrement(this.options.composeOptions[index])
    }


    this.composeOptions[index].values[optionIndex] = {
      valueName: this.options.composeOptions[index].composeOption.options[optionIndex],
      value: event[0]
    }
  }
  validateIncrement(item: any){
    let role =  typeof  this._authService.getRole() as string
    if(role == "client"){
      return item.clientPrice;
    }else if(role == "frequent"){
      return item.frequentPrice;
    }else if(role == "federal"){
      return item.federalPrice;
    }else{
     return item.federalPrice;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadImages(items: any){

  }
  submit():void {
  
    this.emitAttributes.emit(this.composeOptions);
    this.dialogRef.close(this.composeOptions);
  }
}
