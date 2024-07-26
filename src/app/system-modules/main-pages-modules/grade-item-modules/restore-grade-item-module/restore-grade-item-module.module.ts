import { NgModule } from '@angular/core';

import { RestoreGradeItemModuleRoutingModule } from './restore-grade-item-module-routing.module';

// Component
import { RestoreGradeItemComponent } from 'src/app/main/grade-item/restore-grade-item/restore-grade-item.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreGradeItemComponent
  ],
  imports: [
    SharedModule,
    RestoreGradeItemModuleRoutingModule
  ]
})
export class RestoreGradeItemModuleModule { }
