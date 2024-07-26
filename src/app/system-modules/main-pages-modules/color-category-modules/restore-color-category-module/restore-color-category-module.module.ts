import { NgModule } from '@angular/core';

import { RestoreColorCategoryModuleRoutingModule } from './restore-color-category-module-routing.module';

// Component
import { RestoreColorCategoryComponent } from 'src/app/main/color-category/restore-color-category/restore-color-category.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

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
