import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';
import { HeaderInformationComponent } from './components/header-information/header-information.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderInformationComponent,
    HeaderNavigationComponent,
    HeaderCategoriesComponent,
    MainPageComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
