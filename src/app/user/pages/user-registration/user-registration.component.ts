import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { UserLogin } from 'src/app/shared/models/user-login';
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
    const newUser: UserRegister = this.registForm.value;
    console.log(this.registForm.value);
    this.userService.registerNewUser(newUser).subscribe((token) => {
      console.log(token);
      const login: UserLogin = {
        login: newUser.login,
        password: newUser.password,
      };
      this.userService.loginUser(login).subscribe((token) => {
        console.log(token);
        this.userService
          .getCurrentUser()
          .subscribe((user) => console.log(user));
      });
    });
  }
}
