import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user-info';
import { UserRegister } from 'src/app/shared/models/user-register';
import { UserLogin } from 'src/app/shared/models/user-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3004';

  user: UserRegister = {
    firstName: 'Alex',
    lastName: 'Karzhov',
    login: 'alexius90e',
    password: '123456789',
  };

  constructor(private http: HttpClient) {
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/users/userInfo`);
  }

  registerNewUser(user: UserRegister) {
    return this.http.post(`${this.baseUrl}/users/register`, JSON.stringify(user));
  }

  loginUser(user: UserLogin) {
    return this.http.post(`${this.baseUrl}/users/login`, JSON.stringify(user));
  }
}
