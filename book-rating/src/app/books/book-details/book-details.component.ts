import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, timer, interval } from 'rxjs';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BookStoreService) {
  }

  ngOnInit() {

    // from array
    // from(['A', 'B', 'C'])

    // interval(2000).subscribe(e => console.log(e));

    // creation function
    of('A', 'B', 'C').subscribe(
      d => console.log(d),
      () => {},
      () => console.log('COMPLETED!')
    );















    this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.bookService.getBook(isbn))
    ).subscribe(
      book => this.book = book,
      (e: HttpErrorResponse) => this.book = {
        isbn: '?',
        title: 'Status:' + e.status,
        description: e.message,
        rating: 1
      }
    );
  }
}
