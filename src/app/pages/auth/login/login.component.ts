import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/models/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted:boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
  });
  errorMessage: string = "";

  get f() { return this.loginForm.controls; }

  constructor(public fb: FormBuilder, private _auth: AuthService, public router: Router) {}

  ngOnInit(): void {
  }
  submit():void {
   this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    this._auth.login({
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe( res => {
      console.log(res)
      this.loginForm.disable();
      this.router.navigate(['dashboard']);
    })
  }
}
