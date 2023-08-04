import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileFormComponent } from './../../profile-form/profile-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DashboardUserFormComponent } from '../../../dashboard-user/dashboard-user-form/dashboard-user-form.component';

@Component({
  selector: 'app-profile-password-editor',
  templateUrl: './password-editor.component.html',
  styleUrls: ['./password-editor.component.scss']
})
export class ProfilePasswordEditorComponent {
  password:string = "";
  
  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });;

  get f() { return this.passwordForm.controls; }

  constructor(private fb : FormBuilder, private dialogRef: MatDialogRef<DashboardUserFormComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any){
      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    
    validatePassword():boolean{
      if(this.f['password'].value == this.f['confirmPassword'].value){
        return true;
      } else if(this.passwordForm.controls['password'].errors?.['pattern']){
        Swal.fire('Password validation', "You need add a number, capital letter or simbol!", 'error')
        return false;
      } 
      else{
        Swal.fire('Password validation', "Password doesn't match!", 'error')
        return false;
      }
    }
    submit():void {
      if (this.validatePassword()) {
        this.dialogRef.close(this.password);
      }
    }
}
