import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  submit() {
    console.log(this.authForm.value);
  }

  goUserPage(pageName: string): void {
    this.router.navigate([`user/${pageName}`]);
  }
}
