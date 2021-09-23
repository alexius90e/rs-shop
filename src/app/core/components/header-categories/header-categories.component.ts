import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../shared/models/category';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss']
})
export class HeaderCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private router: Router, private appData: AppDataService) {}

  ngOnInit() {
    this.appData
      .getCategories()
      .subscribe(categories => (this.categories = categories));
  }

  goCategoryPage(id: string) {
    this.router.navigate([`/goods/${id}`]);
  }
}
