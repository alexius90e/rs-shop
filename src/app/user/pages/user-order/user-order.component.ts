import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { UserService } from '../../../core/services/user.service';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { UserInfo } from 'src/app/shared/models/user-info';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
})
export class UserOrderComponent implements OnInit, OnDestroy {
  public cartItems: ShopItem[] = [];

  private userSubscription: Subscription = Subscription.EMPTY;

  private itemSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private userService: UserService,
    private appdata: AppDataService
  ) {}

  ngOnInit() {
    this.getCart();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
  }

  getCart() {
    this.userSubscription = this.userService
      .getUserInfo()
      .pipe(
        map((userInfo: UserInfo): ShopItem[] => {
          const cartItems: ShopItem[] = [];
          for (let cartItemId of userInfo.cart) {
            this.userSubscription = this.appdata
              .getShopItemById(cartItemId)
              .subscribe((cardItem) => cartItems.push(cardItem));
          }
          return cartItems;
        })
      )
      .subscribe((cartItems: ShopItem[]): void => {
        this.cartItems = cartItems;
      });
  }

  deleteItem(id: string) {
    this.userService.deleteCartItem(id).subscribe();
    this.getCart();
  }
}
