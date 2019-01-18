import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map, switchMap, filter, reduce, scan, tap, catchError, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, timer, interval, Observable } from 'rxjs';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BookStoreService) {
  }

  ngOnDestroy() {
    // hier subscriptions unsubscriben!!!
  }

  ngOnInit() {

    this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.bookService.getBook(isbn)
        .pipe(
          catchError(e => of({
            isbn: '?',
            title: 'Status:' + e.status,
            description: e.message,
            rating: 1
          }))
        ))
      // catchError - HIER NICHT
    ).subscribe(
      book => this.book = book
    );
  }
}
