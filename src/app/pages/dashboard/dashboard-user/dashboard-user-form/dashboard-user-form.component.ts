import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models';
import { FileService } from 'src/app/core/services/file.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { DashboardUserPasswordEditorComponent } from '../components/password-editor/password-editor.component';

@Component({
  selector: 'app-dashboard-user-form',
  templateUrl: './dashboard-user-form.component.html',
  styleUrls: ['./dashboard-user-form.component.scss']
})
export class DashboardUserFormComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  errors:any[]= [];
  roles:any[]= ['admin', 'super-user', 'client', 'federal', 'frequent'];
  user: IUser = {
    fullName: "",
    phoneNumber: "",
    avatar: "",
    addresses: [],
 
  };
  fileName: string = "";
  fileAttr = 'Choose File';
  userID: any = "";
  images: any = [];
  hasPasswordAdded:boolean = false;
  constructor(private _userService: UserService, private _uploadService: FileService, private dialog: MatDialog,  private router: Router, private route : ActivatedRoute) { 
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
      
      if(typeof res.user.name != 'undefined' && res.user.name != ''){
        this.user.fullName = res.user.name
        delete res.user.name
      }
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
  }
  
  getUserForm():IUser{
    let images: any[] = [];
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
    if (typeof this.user._id != 'undefined') {
      this.userID = this.user._id;
    }
    // if(typeof this.user.name != 'undefined' && this.user.name != ''){
    //   delete this.user.name
    // }
    delete this.user._id;
    delete this.user.createdAt;
    delete this.user.updatedAt;
    delete this.user.password;
    delete this.user.__v;
    delete this.user.role;

    delete this.user.password;

    this.user.fullName = this.user.fullName
    this.user.phoneNumber= this.user.phoneNumber
    
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
      this.user.addresses.splice(i,1);
  }
  save() {
    let user: IUser = this.getUserForm()

    setTimeout(()=>{   
      this._userService.update(this.userID, user).subscribe( () => {
        this.form.disable();
        this.router.navigate(['dashboard/user']);
        }, (error: any) => {
          Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
        }
      )
    }, 5000);   
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardUserPasswordEditorComponent, {
      data: {
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.user.password = result;
        this.hasPasswordAdded = true;
      }
    });
  }
}
