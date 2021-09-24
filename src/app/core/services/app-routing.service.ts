import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppRoutingService {
  constructor(private router: Router) {}

  navigateToMainPage() {
    this.router.navigate(['']);
  }

  navigateToItemPage(id: string) {
    this.router.navigate([`store/item/${id}`]);
  }

  navigateToLoginPage() {
    this.router.navigate([`user/auth`]);
  }

  navigateToRegisterPage() {
    this.router.navigate([`user/register`]);
  }

  navigateToOrderPage() {
    this.router.navigate([`user/order`]);
  }

  navigateToAsidePage() {
    this.router.navigate([`user/aside`]);
  }
}
