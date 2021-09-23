import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { GoodPageComponent } from './pages/good-page/good-page.component';
import { StoreRoutingModule } from './store-routing.module';
import { GoodRatingComponent } from '../shared/components/good-rating/good-rating.component';

@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoryPageComponent,
    GoodPageComponent,
    GoodRatingComponent
  ],
  imports: [CommonModule, StoreRoutingModule],
})
export class StoreModule {}
