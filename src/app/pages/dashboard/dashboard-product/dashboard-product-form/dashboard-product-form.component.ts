import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ComposeOptionService } from 'src/app/core/services/compose-option.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductAttributeStepperComponent } from 'src/app/shared/components/product-attribute-stepper/product-attribute-stepper.component';
import { FileService } from 'src/app/core/services/file.service';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-product-form',
  templateUrl: './dashboard-product-form.component.html',
  styleUrls: ['./dashboard-product-form.component.scss']
})
export class DashboardProductFormComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  attributeForm: FormGroup = new FormGroup({});
  errors:any[]= [];
  product: IProduct;
  fileName: string = "";
  fileAttr = 'Choose File';
  addOnBlur = true;
  hasAttributesAdded:boolean = false
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];
  composeOptions: any[] = []
  composeOption: any = ""
  productAttributes: any[] = []
  images: any[] = [];
  announcer = inject(LiveAnnouncer);
  priceForm: FormGroup = new FormGroup({});
  salesForOrderForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private _composeOptionService: ComposeOptionService, public dialog: MatDialog,
     private _productService: ProductsService, private _uploadService: FileService, private router: Router) { 
     this.product = this.form.value as IProduct;
  }

  ngOnInit(): void {
    this.getComposeOptions();
    this.form = this.fb.group({
      productName: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(4)]],
      needOptionsCompose:[false],
      needFieldsToOrder:[false],
      composeOption: [null],
      attributes: this.fb.array([])
    });

    this.attributeForm = this.fb.group({
      prices: this.fb.array([]),
      salesForOrderPermit: this.fb.array([]),
    });
  }

  getComposeOptions(): void{
    this._composeOptionService.getAll({}).then((x: any) =>{
      this.composeOptions = x;
    })
  }

  addImages(event:any): void{
    this.images = event;
  }

  submit(form: FormGroup) {
    console.log("Submiting")
    console.log(form)
    if (form.invalid) {
      Swal.fire('There are unfilled fields...', 'Please check the form!', 'error')
      return;
    }

    if (!this.hasAttributesAdded) {
      Swal.fire('There is no attributes assigned to the product...', 'Please open the form  attribute!', 'error')
      return;
    }
    let product: IProduct = this.getProduct();

    this._productService.save(product).subscribe( res => {
        console.log(res)
        this.form.disable();
        this.router.navigate(['dashboard']);
      }, error => {
        console.log(error)
        Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
      }
    )
  }

  getProduct():IProduct{
    let images: any[] = [];
    console.log("Uploading")
    console.log(this.images)
    if(this.images.length > 0){
      this.images.forEach((image: any) =>{
        this._uploadService.upload(image).subscribe((res: any) => {
          images.push(res)
        })
      })
    }
    console.log(images)
    this.product = {
      productName: this.form.value.productName,
      description: this.form.value.productName,
      images: images,
      attributes: this.productAttributes,
      productComposeOptions: this.composeOptions.find(x => x._id == this.composeOption),
      tags: this.tags
    }
    return this.product;
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductAttributeStepperComponent, {
      data: this.productAttributes
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.productAttributes = result;
        this.hasAttributesAdded = true;
      }
    });
  }
}