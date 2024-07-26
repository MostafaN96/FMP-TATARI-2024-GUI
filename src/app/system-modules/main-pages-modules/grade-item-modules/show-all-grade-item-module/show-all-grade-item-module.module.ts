import { NgModule } from '@angular/core';

import { ShowAllGradeItemModuleRoutingModule } from './show-all-grade-item-module-routing.module';

// Component
import { ShowAllGradeItemComponent } from 'src/app/main/grade-item/show-all-grade-item/show-all-grade-item.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateGradeItemComponent } from 'src/app/main/grade-item/update-grade-item/update-grade-item.component';

@NgModule({
  declarations: [
    ShowAllGradeItemComponent,
    UpdateGradeItemComponent
  ],
  imports: [
    SharedModule,
    ShowAllGradeItemModuleRoutingModule
  ]
})
export class ShowAllGradeItemModuleModule { }
