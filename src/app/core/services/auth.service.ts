import { Injectable } from '@angular/core';
import { UserRegister } from 'src/app/shared/models/user-register';
import { UserLogin } from 'src/app/shared/models/user-login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  public loginUser(user: UserLogin): Observable<void | UserLogin> {
    return this.http
      .post<UserLogin>(`${this.baseUrl}/users/login`, user)
      .pipe(catchError(async (error) => console.log(error)));
  }

  public registerUser(user: UserRegister): Observable<void | UserRegister> {
    return this.http
      .post<UserRegister>(`${this.baseUrl}/users/register`, user)
      .pipe(catchError(async (error) => console.log(error)));
  }
}
