import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map, switchMap, filter, reduce, scan, tap, catchError } from 'rxjs/operators';
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

    // from array
    // from(['A', 'B', 'C'])

    // interval(2000).subscribe(e => console.log(e));

    const observer = {
      next: d => console.log(d),
      error: e => console.error(e),
      complete: () => console.log('COMPLETED!')
    };

    const myObservable$ = new Observable<number>(observer2 => {

      observer2.next(1);
      observer2.next(2);

      setTimeout(() => observer2.next(3), 1000);
      setTimeout(() => observer2.next(4), 2000);
      setTimeout(() => observer2.error('Mist!'), 3000);
      // setTimeout(() => observer2.complete(), 3000);
    });

    const subscription = myObservable$
      .pipe(
        map(d => d * 10),
        filter(d => d !== 20),
        tap(d => console.log('TAP', d)),
        scan((acc, value) => acc + value),
        catchError(e => of('😀'))
      )
      .subscribe(observer);

    // setTimeout(() => subscription.unsubscribe(), 1000);













    this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.bookService.getBook(isbn)),
      // catchError
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
