import { Component, OnInit } from '@angular/core';
import { Menu } from '../../shared/data/menus';
import { menuList as staticMenuList } from '../../shared/data/menus';

@Component({
  selector: 'll-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  particlesOptions = {
    particles: {
      color: {
        value: ['#ffffff', '#ffffff']
      },
      size: {
        value: 1
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 1.5
      }
    }
  };
  menuList: Menu[] = [];
  
  constructor(){
    this.menuList = staticMenuList;
  }

  ngOnInit(): void {}
}
