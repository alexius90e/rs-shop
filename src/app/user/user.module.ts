import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { UserAsideComponent } from './pages/user-aside/user-aside.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { UserOrderFormComponent } from './components/user-order-form/user-order-form.component';
import { GoodRatingComponent } from './components/good-rating/good-rating.component';
import { UserOrderListComponent } from './pages/user-order-list/user-order-list.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule, FormsModule],
  declarations: [
    UserAuthComponent,
    UserOrderComponent,
    UserAsideComponent,
    UserRegistrationComponent,
    UserOrderFormComponent,
    UserOrderListComponent,
    GoodRatingComponent,
    UserOrderListComponent
  ],
})
export class UserModule {}
