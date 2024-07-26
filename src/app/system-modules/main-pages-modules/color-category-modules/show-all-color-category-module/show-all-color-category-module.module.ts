import { NgModule } from '@angular/core';

import { ShowAllColorCategoryModuleRoutingModule } from './show-all-color-category-module-routing.module';

// Component
import { ShowAllColorCategoryComponent } from 'src/app/main/color-category/show-all-color-category/show-all-color-category.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateColorCategoryComponent } from 'src/app/main/color-category/update-color-category/update-color-category.component';

@NgModule({
  declarations: [
    ShowAllColorCategoryComponent,
    UpdateColorCategoryComponent
  ],
  imports: [
    SharedModule,
    ShowAllColorCategoryModuleRoutingModule
  ]
})
export class ShowAllColorCategoryModuleModule { }
