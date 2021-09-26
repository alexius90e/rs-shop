import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { OrderItem } from 'src/app/shared/models/order-item';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { UserInfo } from 'src/app/shared/models/user-info';
import { UserOrder } from 'src/app/shared/models/user-order';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss'],
})
export class UserOrderListComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription = Subscription.EMPTY;

  private itemSubscription: Subscription = Subscription.EMPTY;

  public orders: UserOrder[] = [];

  public currentOrderItems: ShopItem[] = [];

  public currentOrder: number = 0;

  constructor(
    private userService: UserService,
    private appdata: AppDataService
  ) {}

  ngOnInit() {
    this.getOrders();
    this.getItems(this.orders[this.currentOrder].items);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
  }

  getOrders() {
    this.userSubscription = this.userService
      .getUserInfo()
      .pipe(map((userInfo: UserInfo): UserOrder[] => userInfo.orders))
      .subscribe((orders: UserOrder[]): void => {
        this.orders = orders.reverse();
        this.getItems(this.orders[this.currentOrder].items);
      });
  }

  getItems(items: OrderItem[]) {
    this.currentOrderItems = [];
    items.forEach((item: OrderItem): void => {
      this.itemSubscription = this.appdata
        .getShopItemById(item.id)
        .subscribe((orderItem) => this.currentOrderItems.push(orderItem));
    });
  }

  showOrder(index: number) {
    this.currentOrder = index;
    this.getItems(this.orders[index].items);
  }
}
