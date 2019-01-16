import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  private readonly minRating = 1;
  private readonly maxRating = 5;

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(book.rating - 1, this.minRating)
    };
  }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, this.maxRating)
    };
  }

  constructor() { }
}
