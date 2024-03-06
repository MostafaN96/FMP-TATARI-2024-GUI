import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreColorCategoryModuleRoutingModule } from './restore-color-category-module-routing.module';

// Component
import { RestoreColorCategoryComponent } from '../../../../main/color-category/restore-color-category/restore-color-category.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreColorCategoryComponent
  ],
  imports: [
    SharedModule,
    RestoreColorCategoryModuleRoutingModule
  ]
})
export class RestoreColorCategoryModuleModule { }
