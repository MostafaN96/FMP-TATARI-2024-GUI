import { NgModule } from '@angular/core';

import { AddColorCategoryModuleRoutingModule } from './add-color-category-module-routing.module';

// Component
import { AddColorCategoryComponent } from 'src/app/main/color-category/add-color-category/add-color-category.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

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
