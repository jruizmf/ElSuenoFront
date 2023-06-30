import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted:boolean = false;

  signupForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });
  errorMessage: string = "";
  _matchPassword: boolean = false;

  get f() { return this.signupForm.controls; }

  get matchPassword() { return this._matchPassword; }

  
  constructor(public fb: FormBuilder, private _auth: AuthService, public router: Router) {}

  ngOnInit(): void {
  }

  submit():void {
    this.submitted = true;
    if (!this.signupForm.valid || !this.validatePassword()) {
      return;
    }

    this._auth.register({
      fullName: this.f.fullName.value,
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe( res => {
      console.log(res)
      this.signupForm.disable();

      this.router.navigate(['auth/login']);
    })    
  }

  validatePassword():boolean{
    console.log(this.signupForm.controls['password'].value)
    console.log(this.signupForm.controls['confirmPassword'].value)
    if(this.signupForm.controls['password'].value == this.signupForm.controls['confirmPassword'].value){
      this._matchPassword = true;
      return true;
    } else{
      this._matchPassword = false;
      return false;
    }
  }
}
