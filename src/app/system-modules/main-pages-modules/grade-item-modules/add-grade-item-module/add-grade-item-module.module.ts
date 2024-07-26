import { NgModule } from '@angular/core';

import { AddGradeItemModuleRoutingModule } from './add-grade-item-module-routing.module';

// Component
import { AddGradeItemComponent } from 'src/app/main/grade-item/add-grade-item/add-grade-item.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddGradeItemComponent
  ],
  imports: [
    SharedModule,
    AddGradeItemModuleRoutingModule
  ]
})
export class AddGradeItemModuleModule { }
