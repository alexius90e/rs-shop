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
  constructor(
    private userService: UserService,
    private appdata: AppDataService
  ) {}

  public cartItems: ShopItem[] = [];

  private userSubscription: Subscription = Subscription.EMPTY;

  private itemSubscription: Subscription = Subscription.EMPTY;

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
      .pipe(map((userInfo: UserInfo): string[] => userInfo.cart))
      .subscribe((cart: string[]) => {
        const a: ShopItem[] = []
        for (let cartItemId of cart) {
          this.userSubscription = this.appdata
            .getShopItemById(cartItemId)
            .subscribe((cardItem) => a.push(cardItem));
        }
        this.cartItems = a;
      });
  }

  deleteItem(id: string) {
    this.userService.deleteCartItem(id).subscribe();
    this.getCart();
  }
}
