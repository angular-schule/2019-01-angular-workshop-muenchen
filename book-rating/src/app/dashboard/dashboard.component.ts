import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: string[];

  constructor() {
  }

  ngOnInit() {
    this.books = ['Buch 1', 'Buch 2', 'Buch 3'];
  }

}
