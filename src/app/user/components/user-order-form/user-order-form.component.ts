import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppRoutingService } from 'src/app/core/services/app-routing.service';
import { UserService } from 'src/app/core/services/user.service';
import { OrderItem } from 'src/app/shared/models/order-item';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { UserOrderRequest } from 'src/app/shared/models/user-order-request';

@Component({
  selector: 'app-user-order-form',
  templateUrl: './user-order-form.component.html',
  styleUrls: ['./user-order-form.component.scss'],
})
export class UserOrderFormComponent {
  @Input() items: ShopItem[] = [];

  public fields: string[] = ['name', 'address', 'phone', 'timeToDeliver'];

  public orderIsComplete: boolean = false;

  constructor(
    private userService: UserService,
    private appRouting: AppRoutingService
  ) {}

  orderForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zА-Яа-я]{3,50}$'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zА-Яа-я]{3,250}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[+][0-9]{1,3}[0-9]{1,4}[0-9]{3}[0-9]{2}[0-9]{2}$'),
    ]),
    timeToDeliver: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.maxLength(250)),
  });

  submit() {
    const items: OrderItem[] = this.items.map((item) => {
      return {
        id: item.id,
        amount: item.amount ? item.amount : 1,
      };
    });
    const details = this.orderForm.value;
    const orderRequest: UserOrderRequest = { items, details };
    this.userService.addOrder(orderRequest).subscribe();
    this.orderIsComplete = true;
    setTimeout(() => this.appRouting.navigateToMainPage(), 2000);
  }
}
