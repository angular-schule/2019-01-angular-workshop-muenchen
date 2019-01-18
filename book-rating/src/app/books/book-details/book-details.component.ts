import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map, switchMap, filter, reduce, scan, tap, catchError, mergeMap, share } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, timer, interval, Observable, never, EMPTY } from 'rxjs';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private bookService: BookStoreService) {
  }

  ngOnInit() {

    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.bookService.getBook(isbn)
        .pipe(catchError(() => EMPTY))
      ),
      share()
    );
  }
}
