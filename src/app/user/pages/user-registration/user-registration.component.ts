import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { TokenResponse } from 'src/app/shared/models/token-response';
import { UserRegister } from 'src/app/shared/models/user-register';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent {
  fields: string[] = ['firstName', 'lastName', 'login', 'password'];

  registForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zА-Яа-я]{3,40}$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zА-Яа-я]{3,40}$'),
    ]),
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
    const user: UserRegister = this.registForm.value;
    localStorage.setItem('currentUser', JSON.stringify({login: user.login, password: user.password}));
    this.userService.registerUser(user).subscribe((token: TokenResponse) => {
      this.userService.setAuthorizationToken(token.token);
      this.userService.isAuthorized = true;
      this.router.navigate(['']);
    });
  }
}
