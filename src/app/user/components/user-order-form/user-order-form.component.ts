import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-order-form',
  templateUrl: './user-order-form.component.html',
  styleUrls: ['./user-order-form.component.scss'],
})
export class UserOrderFormComponent {
  fields: string[] = ['name', 'address', 'phone', 'timeToDeliver'];

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
    console.log(this.orderForm.value);
  }
}
