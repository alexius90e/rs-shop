import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ShopItem } from 'src/app/shared/models/shop-item';
import { AppDataService } from '../../services/app-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
})
export class HeaderNavigationComponent implements OnInit {
  public searchQuery: string = '';
  public searchItems: ShopItem[] = [];
  public searchSubscription!: Subscription;
  public searchForm: FormGroup = new FormGroup({
    searchQuery: new FormControl(),
  });
  public headerState = {
    searchBar: false,
    userInfo: false,
  };

  constructor(
    private router: Router,
    private appData: AppDataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.searchSubscription = this.searchForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res: { searchQuery: string }) => {
        this.searchQuery = res.searchQuery
        if (res.searchQuery && res.searchQuery.length > 1) {
          this.getSearchItems();
        } else {
          this.headerState.searchBar = false;
          this.searchItems = [];
        }
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  getSearchItems() {
    this.appData.getShopItemBySearchQuery(this.searchQuery).subscribe((items: ShopItem[]) => {
      this.searchItems = items.filter((item: ShopItem) => {
        const string = item.name.toLocaleLowerCase();
        const subString = this.searchQuery.toLocaleLowerCase();
        return string.includes(subString);
      });
      if (this.searchItems.length > 0) this.headerState.searchBar = true;
    });
  }

  goCatalog() {
    this.router.navigate(['store/categories']);
    this.hideDropdowns();
  }

  goHome() {
    this.router.navigate(['']);
    this.hideDropdowns();
  }

  goItemPage(id: string) {
    this.router.navigate([`store/item/${id}`]);
    this.hideDropdowns();
  }

  goUserPage(pageName: string): void {
    this.router.navigate([`user/${pageName}`]);
    this.hideDropdowns();
  }

  toggleUserInfo() {
    this.headerState.userInfo = !this.headerState.userInfo;
  }

  toggleSearch() {
    this.headerState.searchBar = !this.headerState.searchBar;
  }

  showSearch() {
    this.headerState.searchBar = true;
  }

  hideDropdowns() {
    this.headerState.userInfo = false;
    this.headerState.searchBar = false;
  }
}
