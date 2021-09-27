import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user-info';
import { UserRegister } from 'src/app/shared/models/user-register';
import { UserLogin } from 'src/app/shared/models/user-login';
import { catchError, retry } from 'rxjs/operators';
import { OrderItem } from 'src/app/shared/models/order-item';
import { UserOrder } from 'src/app/shared/models/user-order';
import { UserOrderModify } from 'src/app/shared/models/user-order-modify';
import { TokenResponse } from 'src/app/shared/models/token-response';
import { UserOrderRequest } from 'src/app/shared/models/user-order-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = 'http://localhost:3004';

  public isAuthorized = false;

  private token: string = '';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  public getAuthorizationToken() {
    return this.token;
  }

  public setAuthorizationToken(token: string) {
    this.token = token;
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/users/userInfo`).pipe(
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  public loginUser(user: UserLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/users/login`, user);
  }

  public logoutUser(): void {
    this.token = '';
    this.isAuthorized = false;
  }

  public registerUser(user: UserRegister): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      `${this.baseUrl}/users/register`,
      user
    );
  }

  public addFavoritesItem(item: OrderItem): Observable<void | OrderItem> {
    return this.http
      .post<OrderItem>(`${this.baseUrl}/users/favorites`, item)
      .pipe(catchError(async (error) => console.log(error)));
  }

  public deleteFavoritesItem(id: string): Observable<unknown> {
    return this.http
      .delete(`${this.baseUrl}/users/favorites?id=${id}`)
      .pipe(catchError(async (error) => console.log(error)));
  }

  public addCartItem(item: OrderItem): Observable<OrderItem> {
    return this.http
      .post<OrderItem>(`${this.baseUrl}/users/cart`, item)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public deleteCartItem(id: string): Observable<unknown> {
    return this.http
      .delete(`${this.baseUrl}/users/cart?id=${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public addOrder(order: UserOrderRequest): Observable<UserOrder> {
    return this.http
      .post<UserOrder>(`${this.baseUrl}/users/order`, order)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public updateOrder(order: UserOrderModify): Observable<UserOrderModify> {
    return this.http
      .put<UserOrderModify>(`${this.baseUrl}/users/order`, order)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public deleteOrder(id: string): Observable<unknown> {
    return this.http
      .delete(`${this.baseUrl}/users/cart?id=${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
