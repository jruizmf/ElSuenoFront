import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddress, IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { FileService } from 'src/app/core/services/file.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  errors:any[]= [];
  user: IUser = {
    fullName: "",
    phoneNumber: "",
    avatar: "",
    addresses: [],
 
  };
  fileName: string = "";
  fileAttr = 'Choose File';
  userID: any = "";
  images: any = []
  constructor(private _userService: UserService, private _uploadService: FileService, private router: Router, private route : ActivatedRoute) { 
    this.userID = this.route.snapshot.paramMap.get('term')
  }


  getUser(){
    this._userService.findOne(this.userID).then((res:any) => {
      this.user = res.user;
      
      if(typeof this.user.banner == 'undefined'){
        this.user.banner = "";
      }
      this.addAddress()
    })  
  }

  ngOnInit(): void {
    this._userService.findOne(this.userID).then((res:any) => {
      this.user = res.user;
      if(typeof this.user.banner == 'undefined'){
        this.user.banner = "";
      }
      if(res.user.addresses.length == 0){
      
          this.user.addresses = [
            {
              addressName:"",
              firstName: "",
              lastName: "",
              address: "",
              address2: "",
              zipCode: "",
              city: "",
              state: "",
              phone: ""
        
            }
          ];
        
        
      }
      
    
    })  
  }
  
  addImages(event:any): void{
    this.images = event;
    console.log(this.images)
  }
  
  getUserForm():IUser{
    let images: any[] = [];
    console.log("Form")
    console.log(this.images.length)
    if(this.images.length > 0){
      for (let i = 0; i < this.images.length; i++) {
        if (typeof this.images[i] != 'string') {
          this._uploadService.upload(this.images[i]).then((res: any) => {
            images[i] = res;
            this.user.avatar = res
          })
        } else {
          images[i] = this.images[i]
        }
      }
    }
    console.log("images")
    console.log(images)
    if (typeof this.user._id != 'undefined') {
      this.userID = this.user._id;
    }
    delete this.user._id;
    delete this.user.createdAt;
    delete this.user.updatedAt;
    delete this.user.password;
    delete this.user.__v;
    delete this.user.role;

    delete this.user.password;

    this.user.fullName = this.user.fullName
    this.user.phoneNumber= this.user.phoneNumber
    console.log(images[0])
    this.user.avatar = images[0]
    for (let i = 0; i < this.user.addresses.length; i++) {
      delete this.user.addresses[i]._id
    }
    this.user.addresses = this.user.addresses
   
   
   
    console.log(this.user)
    return this.user;
  }
  newAddress(): any {
    return {
      addressName:"",
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      state: "",
      phone: ""

    }
  }
  

  addAddress(): void {
    if(typeof this.user.addresses != 'undefined')
      this.user.addresses.push(this.newAddress());
  }
  removeAddress(i:number) {
    if(typeof this.user.addresses != 'undefined')
      delete this.user.addresses[i];
  }
  save() {
    let user: IUser = this.getUserForm()
    console.log("Save")
    console.log(user)
    setTimeout(()=>{   
      this._userService.update(this.userID, user).subscribe( res => {
        this.form.disable();
        this.router.navigate(['dashboard/profile']);
        }, error => {
          Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
        }
      )
    }, 5000);   
   
  }
}
