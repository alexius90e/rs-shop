import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';
import { HeaderInformationComponent } from './components/header-information/header-information.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderInformationComponent,
    HeaderNavigationComponent,
    HeaderCategoriesComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
