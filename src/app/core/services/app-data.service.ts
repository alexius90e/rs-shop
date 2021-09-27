import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/shared/models/category';
import { Observable } from 'rxjs';
import { ShopItem } from 'src/app/shared/models/shop-item';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private readonly baseUrl: string = 'http://localhost:3004';

  public shopItems: ShopItem[] = [];

  constructor(private http: HttpClient) {}

  addShopItems(shopItems: ShopItem[]) {
    this.shopItems = shopItems;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getGoodsByCategory(
    id: string,
    count = 12,
    start = 0
  ): Observable<ShopItem[]> {
    const requestUrl = `/goods/category/${id}?start=${start}&count=${count}`;
    return this.http.get<ShopItem[]>(`${this.baseUrl}${requestUrl}`);
  }

  getGoodsBySubcategory(
    catId: string,
    subCatId: string,
    count = 12,
    start = 0
  ): Observable<ShopItem[]> {
    const requestUrl = `/goods/category/${catId}/${subCatId}?start=${start}&count=${count}`;
    return this.http.get<ShopItem[]>(`${this.baseUrl}${requestUrl}`);
  }

  getShopItemById(id: string): Observable<ShopItem> {
    const requestUrl = `/goods/item/${id}`;
    return this.http.get<ShopItem>(`${this.baseUrl}${requestUrl}`);
  }

  getShopItemBySearchQuery(searchQuery: string): Observable<ShopItem[]> {
    const requestUrl = `/goods/search?text=${searchQuery}`;
    return this.http.get<ShopItem[]>(`${this.baseUrl}${requestUrl}`);
  }
}
