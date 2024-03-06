import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddColorCategoryModuleRoutingModule } from './add-color-category-module-routing.module';

// Component
import { AddColorCategoryComponent } from '../../../../main/color-category/add-color-category/add-color-category.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddColorCategoryComponent
  ],
  imports: [
    SharedModule,
    AddColorCategoryModuleRoutingModule
  ]
})
export class AddColorCategoryModuleModule { }
