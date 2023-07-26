import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComposeOptionService } from 'src/app/core/services/compose-option.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-compose-options',
  templateUrl: './dashboard-compose-options.component.html',
  styleUrls: ['./dashboard-compose-options.component.scss']
})
export class DashboardComposeOptionsComponent {
  view = 'list';

  composeOptions: any[] | undefined;
  constructor(private _composeOptionService : ComposeOptionService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }
    getAll(){
    this._composeOptionService.getAll({}).then((x: any[]) => {
      this.composeOptions = x;
    })
  }
  deleteComposeOption(_id:string): void{
    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Save',
    //  denyButtonText: `Don't save`,
    //  }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
     
    //   if (result.isConfirmed) {
     
        this._composeOptionService.delete(_id).subscribe( res => {
          window.location.reload();
          }, error => {
            Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
          }
        )
    //   } else if (result.isDenied) {         
    //     Swal.fire('Cancel..', 'Deletion canceled!', 'warning')
    //   }
    // })
  }
  handleDenial(){

  }
  handleDismiss(event:any){
    
  }
}

