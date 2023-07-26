import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardProductFormComponent } from 'src/app/pages/dashboard/dashboard-product/dashboard-product-form/dashboard-product-form.component';

export interface Size{
  sizeType: string, 
  sizeValue: number, 
  sizeUnit: string
}

export interface Attributes {
  prices: Price[];
  salesForOrderPermit: SalesForOrder[];
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
  selector: 'app-product-attribute-stepper',
  templateUrl: './product-attribute-stepper.component.html',
  styleUrls: ['./product-attribute-stepper.component.scss']
})
export class ProductAttributeStepperComponent {
  @Input() attributes: Attributes;
  @Output() emitAttributes = new EventEmitter();
  isLinear = false;

  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<DashboardProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.isEditing) {
      this.attributes = data.data[0]
    } else{
      this.attributes = {
        prices: [],
        salesForOrderPermit : []
      }
      this.addPrice();
      this.addSaleForOrder();
    }
  }

  newPrice(): Price {
    return {
      sizeTitle: '',
      clientPrice: '',
      frequentPrice: '',
      federalPrice: '',
      sizes: []
    }
  }
 
  newSaleForOrder(): SalesForOrder {
    return {
      decrementClient: 0,
      decrementFederal: 0,
      decrementFrequent: 0,
      unitSale: 0,
      weight:0
    }
  }
  newSize(): Size {
    return {
      sizeType: '', 
      sizeValue: 0, 
      sizeUnit: ''
    }
  }
  addPrice() {
    this.attributes.prices.push(this.newPrice());
  }
  removePrice(i:number) {
    delete this.attributes.prices[i];
  }

  addSaleForOrder() {
    this.attributes.salesForOrderPermit.push(this.newSaleForOrder());
  }
  removeSaleForOrder(i:number) {
    delete this.attributes.salesForOrderPermit[i];
  }

  addPriceSize(i:number) {
    this.attributes.prices[i].sizes.push(this.newSize());
  }

  removePriceSize(i:number, _i:number) {
    delete this.attributes.prices[i].sizes[_i];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit():void {
    this.emitAttributes.emit(this.attributes);
    this.dialogRef.close(this.attributes);
  }
}
