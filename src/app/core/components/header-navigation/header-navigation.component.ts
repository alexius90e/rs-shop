import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
})
export class HeaderNavigationComponent implements OnInit {
  public headerState = {
    categories: false,
    searchBar: false,
    userInfo: false,
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  goCatalog() {
    this.router.navigate(['/categories']);
    this.hideDropdowns();
  }

  goHome() {
    this.router.navigate(['/']);
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

  hideDropdowns() {
    this.headerState.userInfo = false;
    this.headerState.searchBar = false;
  }
}
