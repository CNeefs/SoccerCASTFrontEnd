import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-documentation',
  templateUrl: './user-documentation.component.html',
  styleUrls: ['./user-documentation.component.scss', '../styles.scss']
})
export class UserDocumentationComponent implements OnInit {

  constructor() { }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit(): void {
  }

}
