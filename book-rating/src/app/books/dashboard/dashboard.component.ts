import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];

  todayIsTuesday = true;

  constructor() {
    setTimeout(() => this.todayIsTuesday = false, 1000);
  }

  changeDay() {
    this.todayIsTuesday = true;
  }

  ngOnInit() {
    this.books = [{
      isbn: '000',
      title: 'Angular',
      description: 'Das beste Buch der Welt',
      rating: 5
    },
    {
      isbn: '111',
      title: 'AngularJs',
      description: ':-)',
      rating: 5
    },
    {
      isbn: '222',
      title: 'Der große Polt',
      description: 'Ein Konversationslexikon',
      rating: 5
    }


    ];
  }

}
