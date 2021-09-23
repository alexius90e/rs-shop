import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from '../../../core/services/app-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopItem } from 'src/app/shared/models/shop-item';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  private counter = 1;
  private itemsQty = 12;
  private shopItemsSubscription!: Subscription;
  public shopItems: ShopItem[] = [];
  private routeSubscription!: Subscription;
  public routeParams!: Params;
  private maxHeadingLength: number = 56;
  private isReversed = false;

  constructor(
    private appData: AppDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.routeParams = params;
      this.counter = 1;
      if (this.routeParams.subCatId) {
        this.shopItemsSubscription = this.appData
          .getGoodsBySubcategory(
            this.routeParams.catId,
            this.routeParams.subCatId,
            this.itemsQty * this.counter
          )
          .subscribe((shopItems) => (this.shopItems = shopItems));
      } else {
        this.shopItemsSubscription = this.appData
          .getGoodsByCategory(this.routeParams.catId, this.itemsQty * this.counter)
          .subscribe((shopItems) => (this.shopItems = shopItems));
      }
    });
  }

  ngOnDestroy() {
    this.shopItemsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  cropHeading(heading: string): string {
    if (heading.length > this.maxHeadingLength)
      return `${heading.substring(0, this.maxHeadingLength)}...`;
    return heading;
  }

  slideImages(shopItem: ShopItem): void {
    shopItem.imageUrls = shopItem.imageUrls
      .slice(1)
      .concat(shopItem.imageUrls.slice(0, 1));
  }

  sortByRating() {
    this.shopItems.sort((a, b) =>
      a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0
    );
    if (this.isReversed) this.shopItems.reverse();
    this.isReversed = !this.isReversed;
  }

  sortByPrice() {
    this.shopItems.sort((a, b) =>
      a.price < b.price ? -1 : a.price > b.price ? 1 : 0
    );
    if (this.isReversed) this.shopItems.reverse();
    this.isReversed = !this.isReversed;
  }

  increaseCounter() {
    this.counter += 1;
    console.log(this.counter);
    if (this.routeParams.subCatId) {
      this.shopItemsSubscription = this.appData
        .getGoodsBySubcategory(
          this.routeParams.catId,
          this.routeParams.subCatId,
          this.itemsQty * this.counter
        )
        .subscribe((shopItems) => (this.shopItems = shopItems));
    } else {
      this.shopItemsSubscription = this.appData
        .getGoodsByCategory(this.routeParams.catId, this.itemsQty * this.counter)
        .subscribe((shopItems) => (this.shopItems = shopItems));
    }
  }

  goGoodsPage(id: string) {
    this.router.navigate([
      `/goods/${this.routeParams.catId}/${this.routeParams.subCatId}/${id}`,
    ]);
  }

  goMainPage() {
    this.router.navigate(['']);
  }

  goCategoryPage() {
    this.router.navigate([`/goods/${this.routeParams.catId}`]);
  }

  goSubCategoryPage() {
    this.router.navigate([
      `/goods/${this.routeParams.catId}/${this.routeParams.subCatId}`,
    ]);
  }
}
