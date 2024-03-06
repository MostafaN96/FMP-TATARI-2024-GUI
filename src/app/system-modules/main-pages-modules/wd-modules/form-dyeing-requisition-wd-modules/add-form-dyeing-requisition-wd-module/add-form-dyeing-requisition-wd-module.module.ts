import { NgModule } from '@angular/core';

// Routing Module
import { AddFormDyeingRequisitionWdModuleRoutingModule } from './add-form-dyeing-requisition-wd-module-routing.module';

// Component
import { AddFormDyeingRequisitionWdComponent } from '../../../../../main/wd/form-dyeing-requisition-wd/add-form-dyeing-requisition-wd/add-form-dyeing-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddFormDyeingRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    AddFormDyeingRequisitionWdModuleRoutingModule
  ]
})
export class AddFormDyeingRequisitionWdModuleModule { }
