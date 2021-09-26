import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from '../../../core/services/app-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { UserService } from 'src/app/core/services/user.service';
import { OrderItem } from 'src/app/shared/models/order-item';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  private counter = 1;
  private itemsQty = 8;
  public shopItems: ShopItem[] = [];
  public routeParams!: Params;
  private maxHeadingLength: number = 56;
  private isReversed = false;
  private routeSubscription: Subscription = Subscription.EMPTY;
  private shopItemsSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private appData: AppDataService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.counter = 1;
      this.routeParams = params;
      this.shopItems = [];
      this.addItems(this.routeParams);
    });
  }

  ngOnDestroy() {
    this.shopItemsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  addItems(params: Params) {
    if (params.subCatId) {
      this.getSubcategoryItems();
    } else {
      this.getCategoryItems();
    }
  }

  addMoreItems(shopItems: ShopItem[]) {
    this.shopItems = this.shopItems.concat(
      shopItems.slice(this.itemsQty * (this.counter - 1))
    );
  }

  getSubcategoryItems() {
    this.shopItemsSubscription = this.appData
      .getGoodsBySubcategory(
        this.routeParams.catId,
        this.routeParams.subCatId,
        this.itemsQty * this.counter
      )
      .subscribe((shopItems) => this.addMoreItems(shopItems));
  }

  getCategoryItems() {
    this.shopItemsSubscription = this.appData
      .getGoodsByCategory(this.routeParams.catId, this.itemsQty * this.counter)
      .subscribe((shopItems) => this.addMoreItems(shopItems));
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
    this.addItems(this.routeParams);
  }

  addItemToCart(id: string): void {
    const orderItem: OrderItem = { id, amount: 1 };
    this.userService.addCartItem(orderItem).subscribe();
  }

  addItemToFavorites(id: string): void {
    const orderItem: OrderItem = { id, amount: 1 };
    this.userService.addFavoritesItem(orderItem).subscribe();
  }

  goGoodsPage(id: string) {
    this.router.navigate([`store/item/${id}`]);
  }

  goMainPage() {
    this.router.navigate(['']);
  }

  goCategoryPage() {
    this.router.navigate([`store/goods/${this.routeParams.catId}`]);
  }

  goSubCategoryPage() {
    this.router.navigate([
      `store/goods/${this.routeParams.catId}/${this.routeParams.subCatId}`,
    ]);
  }
}
