import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  public slides: ShopItem[] = [];
  public popular: Array<ShopItem[]> = [];
  public mainCounter = 0;
  public popularCounter = 0;
  private goodsSubscription!: Subscription;

  constructor(private appData: AppDataService, private router: Router) {}

  ngOnInit() {
    setInterval(() => this.showNextSlide(), 5000);
    this.goodsSubscription = this.appData
      .getGoodsByCategory('electronics', 106)
      .subscribe((data: ShopItem[]) => {
        this.slides = this.getDataForMainSlider(data);
        this.popular = this.getDataForPopularSlider(data);
      });
  }

  ngOnDestroy() {
    this.goodsSubscription.unsubscribe();
  }

  private getDataForMainSlider(data: ShopItem[]) {
    return data
      .filter((data) => data.imageUrls.length > 0)
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, 5);
  }

  private getDataForPopularSlider(data: ShopItem[]) {
    const array: ShopItem[] = data
      .filter((data) => data.rating > 4)
      .filter((data) => data.imageUrls[0] !== '')
      .sort(() => (Math.random() > 0.5 ? 1 : -1));
    return this.sliceArray(array, 6);
  }

  private sliceArray(
    array: Array<ShopItem>,
    itemSize: number
  ): Array<ShopItem[]> {
    const slicedArray: Array<ShopItem[]> = [];
    const countOfSlices = Math.ceil(array.length / itemSize);
    for (let i = 0; i < countOfSlices; i++) {
      slicedArray.push(array.slice(i * itemSize, (i + 1) * itemSize));
    }

    console.log(countOfSlices);
    return slicedArray;
  }

  public showNextSlide(): number {
    if (this.mainCounter === this.slides.length - 1) {
      return (this.mainCounter = 0);
    }
    return this.mainCounter++;
  }

  public showNextPopularSlide(): number {
    if (this.popularCounter === this.popular.length - 1) {
      return (this.popularCounter = 0);
    }
    return this.popularCounter++;
  }

  public showPrevPopularSlide(): number {
    if (this.popularCounter === 0) {
      return (this.popularCounter = this.popular.length - 1);
    }
    return this.popularCounter--;
  }

  public goItemPage(id: string) {
    this.router.navigate([`store/item/${id}`]);
  }
}
