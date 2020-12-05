import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userLoaded: boolean = true;
  collapsed: boolean = true;
  isLoggedIn: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
