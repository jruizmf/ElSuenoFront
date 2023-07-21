import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComposeOptionService } from 'src/app/core/services/compose-option.service';

@Component({
  selector: 'app-dashboard-compose-options',
  templateUrl: './dashboard-compose-options.component.html',
  styleUrls: ['./dashboard-compose-options.component.scss']
})
export class DashboardComposeOptionsComponent {
  view = 'list';

  composeOptions: any[] | undefined;
  constructor(private _composeOptionService : ComposeOptionService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }
    getAll(){
    this._composeOptionService.getAll({}).then((x: any[]) => {
      this.composeOptions = x;
    })
  }
  deleteProduct(slug: any){
    this._composeOptionService.delete(slug).subscribe((x: any[]) => {
      
    })
  }
  handleDenial(){

  }
  handleDismiss(event:any){
    
  }
}

