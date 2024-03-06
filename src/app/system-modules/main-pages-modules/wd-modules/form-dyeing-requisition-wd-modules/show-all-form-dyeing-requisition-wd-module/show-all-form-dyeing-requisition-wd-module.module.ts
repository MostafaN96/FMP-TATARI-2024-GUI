import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllFormDyeingRequisitionWdModuleRoutingModule } from './show-all-form-dyeing-requisition-wd-module-routing.module';

// Component
import { ShowAllFormDyeingRequisitionWdComponent } from '../../../../../main/wd/form-dyeing-requisition-wd/show-all-form-dyeing-requisition-wd/show-all-form-dyeing-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllFormDyeingRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    ShowAllFormDyeingRequisitionWdModuleRoutingModule
  ]
})
export class ShowAllFormDyeingRequisitionWdModuleModule { }
