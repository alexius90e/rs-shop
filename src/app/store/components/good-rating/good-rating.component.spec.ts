import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodRatingComponent } from './good-rating.component';

describe('GoodRatingComponent', () => {
  let component: GoodRatingComponent;
  let fixture: ComponentFixture<GoodRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
