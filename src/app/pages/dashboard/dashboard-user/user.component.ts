import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  view = 'list';
  
  users: IUser[] | undefined;
  constructor(private _userService: UserService) {}
  
  ngOnInit(): void {
    this.getAll()
  }

  async  getAll(){
    await this._userService.getAll({}).then((x: IUser[]) => {
      this.users = x;
    })
  }
  deleteUser(event:any, slug: any){
    
  }
}
