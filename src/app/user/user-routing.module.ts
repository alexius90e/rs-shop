import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../shared/guards/user.guard';
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
    canActivate: [UserGuard],
    component: UserOrderComponent,
  },
  {
    path: 'aside',
    canActivate: [UserGuard],
    component: UserAsideComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
