import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isLessThenLargeDevice: any | undefined;
  isExpanded:boolean = true;
  displayList:boolean = false;
  role: string;
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public auth: AuthService) {
    this.role = this.auth.getRole();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }
  onLogout(): void {
    this.auth.logout();
  }
  
  changeSidebar(): void{
    this.isExpanded = !this.isExpanded
  }
}
