import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../../../core/services/app-data.service';
import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  public categories: Category[] = [];
  public activeCategory!: Category;

  constructor(private appData: AppDataService, private router: Router) {}

  ngOnInit() {
    this.appData.getCategories().subscribe(categories => {
      this.categories = categories;
      this.activeCategory = categories[0];
    });
  }

  makeCategoryActive(category: Category) {
    this.activeCategory = category;
  }

  goCategoryPage(catId: string, subCatId?: string) {
    if (subCatId) this.router.navigate([`/goods/${catId}/${subCatId}`]);
    if (!subCatId) this.router.navigate([`/goods/${catId}`]);
  }
}
