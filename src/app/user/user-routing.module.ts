import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAsideComponent } from './pages/user-aside/user-aside.component';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: 'auth',
    component: UserAuthComponent,
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: 'order',
    component: UserOrderComponent,
  },
  {
    path: 'aside',
    component: UserAsideComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
