import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-good-rating',
  templateUrl: './good-rating.component.html',
  styleUrls: ['./good-rating.component.scss'],
})
export class GoodRatingComponent {
  @Input() rating: number = 0;

  generateStars(number: number) {
    return new Array(number);
  }
}
