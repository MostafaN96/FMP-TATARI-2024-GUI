import { NgModule } from '@angular/core';

// Routing Module
import { AddFormDyeingRequisitionByOrderWdModuleRoutingModule } from './add-form-dyeing-requisition-by-order-wd-module-routing.module';

// Component
import { AddFormDyeingRequisitionByOrderWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/add-form-dyeing-requisition-by-order-wd/add-form-dyeing-requisition-by-order-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddFormDyeingRequisitionByOrderWdComponent
  ],
  imports: [
    SharedModule,
    AddFormDyeingRequisitionByOrderWdModuleRoutingModule
  ]
})
export class AddFormDyeingRequisitionByOrderWdModuleModule { }
