import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllDeyingRequisitionWdModuleRoutingModule } from './show-all-deying-requisition-wd-module-routing.module';

// Component
import { ShowAllDyeingRequisitionWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/show-all-dyeing-requisition-wd/show-all-dyeing-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllDyeingRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    ShowAllDeyingRequisitionWdModuleRoutingModule
  ]
})
export class ShowAllDeyingRequisitionWdModuleModule { }
