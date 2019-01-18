import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map } from 'rxjs/operators';

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
    this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      map(isbn => this.bookService.getBook(isbn))
    ).subscribe(data => {
      data.subscribe(book => this.book = book);
    });
  }
}
