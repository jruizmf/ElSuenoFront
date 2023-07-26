import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductComposeOption } from 'src/app/core/models/productComposeOption';
import { ComposeOptionService } from 'src/app/core/services/compose-option.service';
import Swal from 'sweetalert2';

export interface Value {
  value: string,
  valueName: string
}

export interface Option {
  controlName: string,
  controlType: string,
  values: Value[]
}

@Component({
  selector: 'app-dashboard-compose-options-form',
  templateUrl: './dashboard-compose-options-form.component.html',
  styleUrls: ['./dashboard-compose-options-form.component.scss']
})

export class DashboardComposeOptionsFormComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  attributeForm: FormGroup = new FormGroup({});
  errors:any[]= [];

  composeOption: IProductComposeOption = {
    optionName: "",
    options: []
  };
  hasOptions:boolean = false;
  composeOptionID: any;
  isEditing: boolean;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private _composeOptionService: ComposeOptionService, public dialog: MatDialog,
     private router: Router, private route:ActivatedRoute) { 
      this.isLoading = true;
      this.form = this.fb.group({
        optionName: ["", [Validators.required, Validators.minLength(3)]],
      });
      this.composeOptionID = this.route.snapshot.paramMap.get('term')
      if (this.composeOptionID == null) {
        this.isEditing = false
        
        this.isLoading = false;
        this.addOption();
        this.addOptionValue(0)
      } else{
        this.isEditing = true;
        this._composeOptionService.findByTerm(this.composeOptionID).then((data:any) => {

          this.composeOption = data.composeOption as IProductComposeOption;
          this.form.controls['optionName'].patchValue(this.composeOption.optionName);
          this.hasOptions = this.composeOption.options.length > 0;
          this.isLoading = false;
        });
      }
  }

   ngOnInit(): void {
   }

  submit(form: FormGroup) {
    if (form.invalid) {
      Swal.fire('There are unfilled fields...', 'Please check the form!', 'error')
      return;
    }

    if (!this.hasOptions) {
      Swal.fire('There is no options assigned to the Compose Option...', 'Please open the form  attribute!', 'error')
      return;
    }
    let composeOption: IProductComposeOption = this.getComposeOption();
    console.log(composeOption)
    if (this.isEditing) {
      this._composeOptionService.update(this.composeOptionID, composeOption).subscribe( res => {
        this.form.disable();
        this.router.navigate(['dashboard/compose-option']);
        }, error => {
          Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
        }
      )
    } else{
      this._composeOptionService.save(composeOption).subscribe( res => {
        this.form.disable();
        this.router.navigate(['dashboard/compose-option']);
        }, error => {
          Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
        }
      )
    } 
  }

  getComposeOption(): IProductComposeOption{
    if (typeof this.composeOption._id != 'undefined') {
      this.composeOptionID = this.composeOption._id;
    }
    this.composeOption.options = this.composeOption.options.map(o =>{
        o.values = o.values.map( (v:Value) => {
          return {
            valueName: v.valueName,
            value: v.value
          }
        })
      return {
        controlName: o.controlName,
        controlType: o.controlType,
        values: o.values
      }
    })
    this.hasOptions = this.composeOption.options.length > 0;
    console.log(this.composeOption)
    console.log(this.hasOptions)
    this.composeOption = {
      optionName: this.form.value.optionName,
      options:  this.composeOption.options
    }
    return this.composeOption;
  }
  newOption(): any {
    return {
      controlName: "",
      controlType: "",
      values: []
    }
  }
  newOptionValue(): any {
    return {
      valueName: "",
      value: ""
    }
  }
  ableOptions(): void {
    if (!this.isEditing) {
      this.addOption();
    }
  }

  addOption(): void {
    this.composeOption.options.push(this.newOption());
  }
  addOptionValue(i: number): void {
    this.composeOption.options[i].values.push(this.newOptionValue());
  }
  removeOption(i:number) {
    
    this.composeOption.options.splice( i, 1 );
    
  }
  removeOptionValue(i:number, _i:number) {
      this.composeOption.options[i].values.splice( _i, 1 );
  }
}