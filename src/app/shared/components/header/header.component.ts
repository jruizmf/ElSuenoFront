import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { menuList as staticMenuList } from '../../data/menus';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean = false;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean = false;
  isLoggeded: boolean = false;
  menuList: any[] = [];
  isLessThenLargeDevice: boolean | undefined;
  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService) {}

  ngOnInit(): void {
    this.menuList = staticMenuList;
    this.isLoggeded = this.auth.isAuthenticated();
    console.log(this.isLoggeded )
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}
