import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { GoodPageComponent } from './pages/good-page/good-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
  },
  {
    path: 'goods/:catId',
    component: CategoryPageComponent,
  },
  {
    path: 'goods/:catId/:subCatId',
    component: CategoryPageComponent,
  },
  {
    path: 'item/:itemId',
    component: GoodPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
