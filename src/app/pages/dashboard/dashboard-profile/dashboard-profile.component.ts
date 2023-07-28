import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  user: IUser;

  constructor(private _userService: UserService, private _auth: AuthService) { 
    this.user = this._auth.getUser();
    this.getUser()
  }

  ngOnInit(): void {
  }

  getUser(){
    if (typeof this.user.email == 'string') {
      console.log(this.user.email )
      this._userService.findOne(this.user.email).then((res:any) => {
        this.user = res.user;
        console.log(this.user)
      })
    }
    
  }
}
