import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { TokenResponse } from 'src/app/shared/models/token-response';
import { UserLogin } from 'src/app/shared/models/user-login';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  fields: string[] = ['login', 'password'];

  authForm: FormGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9]{3,40}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9]{8,20}$'),
    ]),
  });

  constructor(private router: Router, private userService: UserService) {}

  submit() {
    const user: UserLogin = this.authForm.value;
    this.userService.loginUser(user).subscribe((token: TokenResponse) => {
      this.userService.setAuthorizationToken(token.token);
      this.userService.isAuthorized = true;
      this.router.navigate(['']);
    });
  }

  goUserPage(pageName: string): void {
    this.router.navigate([`user/${pageName}`]);
  }
}
