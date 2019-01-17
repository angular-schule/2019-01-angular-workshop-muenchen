import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  const ratingMock = {
    rateUp: () => { }
  };

  beforeEach(async(() => {

    spyOn(ratingMock, 'rateUp');

    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = {
      isbn: '000',
      title: 'title',
      description: 'test',
      rating: 1
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward the rateUp call to the book rating service', () => {

    component.rateUp();
    expect(ratingMock.rateUp).toHaveBeenCalled();
    expect(ratingMock.rateUp).not.toHaveBeenCalledTimes(2);
  });

  // i'm testing bindings here!
  it('should call the service when the button is clicked', () => {

    const rateUpButton = fixture.debugElement
      .query(By.css('[rateUpButton]'))
      .nativeElement as HTMLButtonElement;

    rateUpButton.click();

    expect(ratingMock.rateUp).toHaveBeenCalled();
  });
});
