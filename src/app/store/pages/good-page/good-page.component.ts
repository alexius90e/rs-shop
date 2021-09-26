import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { OrderItem } from 'src/app/shared/models/order-item';
import { ShopItem } from 'src/app/shared/models/shop-item';

@Component({
  selector: 'app-good-page',
  templateUrl: './good-page.component.html',
  styleUrls: ['./good-page.component.scss'],
})
export class GoodPageComponent implements OnInit {
  public shopItem!: ShopItem;
  public activeImageUrl: string = '';
  public routeParams!: Params;
  private shopItemSubscription!: Subscription;
  private routeSubscription!: Subscription;

  constructor(
    private appData: AppDataService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.routeParams = params;
      this.shopItemSubscription = this.appData
        .getShopItemById(params.itemId)
        .subscribe((shopItem: ShopItem): void => {
          if (shopItem.imageUrls[0])
            this.activeImageUrl = shopItem.imageUrls[0];
          this.shopItem = shopItem;
        });
    });
  }

  ngOnDestroy() {
    this.shopItemSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  activateImage(url: string) {
    this.activeImageUrl = url;
  }

  showNextImage(): void {
    const quantity = this.shopItem.imageUrls.length;
    const imageIndex = this.shopItem.imageUrls.indexOf(this.activeImageUrl);
    const nextImageIndex = imageIndex + 1 < quantity ? imageIndex + 1 : 0;
    this.activeImageUrl = this.shopItem.imageUrls.slice(nextImageIndex)[0];
  }

  addToCart(): void {
    const orderItem: OrderItem = { id: this.shopItem.id, amount: 1 };
    this.userService.addCartItem(orderItem).subscribe();
    this.shopItem.isInCart = !this.shopItem.isInCart;
  }

  deleteFromCart(): void {
    this.userService.deleteCartItem(this.shopItem.id).subscribe();
    this.shopItem.isInCart = !this.shopItem.isInCart;
  }

  addToFavorites(): void {
    const orderItem: OrderItem = { id: this.shopItem.id, amount: 1 };
    this.userService.addFavoritesItem(orderItem).subscribe();
    this.shopItem.isFavorite = !this.shopItem.isFavorite;
  }

  deleteFromFavorites(): void {
    this.userService.deleteFavoritesItem(this.shopItem.id).subscribe();
    this.shopItem.isFavorite = !this.shopItem.isFavorite;
  }

  goMainPage() {
    this.router.navigate(['']);
  }

  goCategoryPage() {
    this.router.navigate([`store/goods/${this.routeParams.catId}`]);
  }

  goSubCategoryPage() {
    this.router.navigate([`store/goods/${this.routeParams.catId}/${this.routeParams.subCatId}`]);
  }
}
