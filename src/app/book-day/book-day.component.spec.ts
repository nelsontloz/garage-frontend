import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDayComponent } from './book-day.component';

describe('BookDayComponent', () => {
  let component: BookDayComponent;
  let fixture: ComponentFixture<BookDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
