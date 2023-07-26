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
import { ActivatedRoute, Router } from '@angular/router';

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
  product: IProduct = {
    productName: "",
    description: "",
    needDocumentOfPrint:false,
    needFieldsToOrder: false,
    needOptionsCompose: false,
    images:[],
    tags:[],
    composeOptions: [],
    attributes: []
  };
  fileName: string = "";
  fileAttr = 'Choose File';
  addOnBlur = true;
  hasAttributesAdded:boolean = false
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  composeOptions: any[] = [];
  images: any[] = [];
  announcer = inject(LiveAnnouncer);
  priceForm: FormGroup = new FormGroup({});
  salesForOrderForm: FormGroup = new FormGroup({});
  productID: any;
  productIdentifier:string = ""
  isEditing: boolean;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private _composeOptionService: ComposeOptionService, public dialog: MatDialog,
     private _productService: ProductsService, private _uploadService: FileService, private router: Router, private route:ActivatedRoute) { 
      this.isLoading = true;
      this.form = this.fb.group({
        productName: ["", [Validators.required, Validators.minLength(4)]],
        description: ["", [Validators.required, Validators.minLength(4)]],
        needOptionsCompose:[false],
        needFieldsToOrder:[false]
      });
      this.productID = this.route.snapshot.paramMap.get('term')
      if (this.productID == null) {
        this.isEditing = false
        
        this.isLoading = false;
      } else{
        this.isEditing = true;
        this._productService.findByTerm(this.productID).then((product:any) => {

          this.product = product.product as IProduct;
          if (product.product.needOptionsCompose) {
            this.product.composeOptions = product.options[0].composeOptions;
          }
          this.hasAttributesAdded = true;
          this.form.controls['productName'].patchValue(this.product.productName);
          this.form.controls['description'].patchValue(this.product.description);
          this.form.controls['needOptionsCompose'].patchValue(this.product.needOptionsCompose);
          this.form.controls['needFieldsToOrder'].patchValue(false);
     
          this.isLoading = false;
        });
      }
  }

  ngOnInit(): void {
    this.getComposeOptions();
  }

  getComposeOptions(): void{
    this._composeOptionService.getAll({}).then((x: any) =>{
      console.log(x)
      this.composeOptions = x;
    })
  }

  addImages(event:any): void{
    this.images = event;
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      Swal.fire('There are unfilled fields...', 'Please check the form!', 'error')
      return;
    }

    if (!this.hasAttributesAdded) {
      Swal.fire('There is no attributes assigned to the product...', 'Please open the form  attribute!', 'error')
      return;
    }
    let product: IProduct = this.getProduct();
    setTimeout(()=>{   
      if (this.isEditing) {
        this._productService.update(this.productIdentifier, product).subscribe( res => {
          this.form.disable();
          this.router.navigate(['dashboard/product']);
          }, error => {
            Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
          }
        )
      } else{
        this._productService.save(product).subscribe( res => {
          this.form.disable();
          this.router.navigate(['dashboard/product']);
          }, error => {
            Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
          }
        )
      }
    
    }, 5000);   
  }

  getProduct():IProduct{
    let images: any[] = [];
    if(this.images.length > 0){
      console.log("Images")
      for (let i = 0; i < this.images.length; i++) {
        console.log(typeof this.images[i])
        console.log(this.images[i])
        if (typeof this.images[i] != 'string') {
          this._uploadService.upload(this.images[i]).then((res: any) => {
            images[i] = res;
          })
        } else {
          images[i] = this.images[i]
        }
        
      }
    }
    if (typeof this.product._id != 'undefined') {
      this.productIdentifier = this.product._id;
    }
    this.product = {
      productName: this.form.value.productName,
      description: this.form.value.description,
      images: images,
      needDocumentOfPrint: false,
      needFieldsToOrder: this.form.value.needFieldsToOrder,
      needOptionsCompose: this.form.value.needOptionsCompose,
      attributes: this.product.attributes,
      composeOptions: this.product.composeOptions,
      tags: this.product.tags
    }
    return this.product;
  }
  newComposeOption(): any {
    return {
      composeOption: '', 
      clientIncrement: 0, 
      federalIncrement: 0,
      frequentIncrement: 0
    }
  }
  ableComposeOptions(): void {
    if (!this.isEditing) {
      this.addComposeOption();
    }
  }

  addComposeOption(): void {
    this.product.composeOptions.push(this.newComposeOption());
  }
  removeComposeOption(i:number) {
    delete this.product.composeOptions[i];
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.product.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.product.tags.indexOf(tag);

    if (index >= 0) {
      this.product.tags.splice(index, 1);

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
    const index = this.product.tags.indexOf(tag);
    if (index >= 0) {
      this.product.tags[index] = value;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductAttributeStepperComponent, {
      data: {
        data: this.product.attributes,
        isEditing: this.isEditing
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.product.attributes = result;
        this.hasAttributesAdded = true;
      }
    });
  }
}