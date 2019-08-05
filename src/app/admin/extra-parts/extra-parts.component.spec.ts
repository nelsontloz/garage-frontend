import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPartsComponent } from './extra-parts.component';

describe('ExtraPartsComponent', () => {
  let component: ExtraPartsComponent;
  let fixture: ComponentFixture<ExtraPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
