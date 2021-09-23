import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
})
export class UserOrderComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
  }
}
