import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { OrderItem } from 'src/app/shared/models/order-item';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { UserInfo } from 'src/app/shared/models/user-info';

@Component({
  selector: 'app-user-aside',
  templateUrl: './user-aside.component.html',
  styleUrls: ['./user-aside.component.scss'],
})
export class UserAsideComponent implements OnInit {
  public favorItems: ShopItem[] = [];

  private userSubscr: Subscription = Subscription.EMPTY;

  private itemSubscr: Subscription = Subscription.EMPTY;

  constructor(
    private userService: UserService,
    private appdata: AppDataService
  ) {}

  ngOnInit() {
    this.getFavorites();
  }

  ngOnDestroy() {
    this.userSubscr.unsubscribe();
    this.itemSubscr.unsubscribe();
  }

  getFavorites() {
    this.userSubscr = this.userService
      .getUserInfo()
      .pipe(map((userInfo: UserInfo): string[] => userInfo.favorites))
      .subscribe((favorItems: string[]): void => {
        favorItems.forEach((itemId: string): void => {
          this.getItemById(itemId);
        });
      });
  }

  getItemById(id: string) {
    this.itemSubscr = this.appdata
      .getShopItemById(id)
      .subscribe((item: ShopItem) => this.favorItems.push(item));
  }

  addItemToCart(item: ShopItem) {
    const orderItem: OrderItem = {id: item.id, amount: 1}
    this.userService.addCartItem(orderItem).subscribe();
    item.isInCart = true;
  }

  removeItemFromCart(item: ShopItem) {
    this.userService.deleteCartItem(item.id).subscribe();
    item.isInCart = false;

  }

  deleteItem(id: string) {
    this.userService.deleteFavoritesItem(id).subscribe();
    this.favorItems = this.favorItems.filter((item) => item.id !== id);
  }
}
