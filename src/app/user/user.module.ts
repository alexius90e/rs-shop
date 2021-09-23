import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { UserAsideComponent } from './pages/user-aside/user-aside.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { UserOrderFormComponent } from './components/user-order-form/user-order-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
  declarations: [
    UserAuthComponent,
    UserOrderComponent,
    UserAsideComponent,
    UserRegistrationComponent,
    UserOrderFormComponent,
  ],
})
export class UserModule {}
