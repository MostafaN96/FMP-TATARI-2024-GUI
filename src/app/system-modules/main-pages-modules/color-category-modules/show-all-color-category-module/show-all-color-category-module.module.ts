import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllColorCategoryModuleRoutingModule } from './show-all-color-category-module-routing.module';

// Component
import { ShowAllColorCategoryComponent } from '../../../../main/color-category/show-all-color-category/show-all-color-category.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateColorCategoryComponent } from '../../../../main/color-category/update-color-category/update-color-category.component';

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
