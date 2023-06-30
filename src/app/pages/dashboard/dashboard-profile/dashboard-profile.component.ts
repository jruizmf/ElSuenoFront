import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  user: IUser;

  constructor( private _auth: AuthService) { 
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
  }

}
