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
  displayList:boolean = false;
  isLessThenLargeDevice: boolean | undefined;
  cartCount:number= 0
  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService) {
    console.log(localStorage.getItem('cart'))
    if (localStorage.getItem('cart') != null) {
      let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log(cart)
      console.log(cart.items)
      console.log(cart.items.length)
      this.cartCount = cart.items.length
      console.log(this.cartCount)
    }
    
  }

  ngOnInit(): void {
    this.menuList = staticMenuList;
    this.isLoggeded = this.auth.isAuthenticated()
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll():void {
    this.isScrolled = window.pageYOffset > 15;
  }

  logout():void{
    this.auth.logout();
  }
}
