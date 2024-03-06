import { NgModule } from '@angular/core';

// Routing Module
import { ReturnRequisitionDetailsWcModuleRoutingModule } from './return-requisition-details-wc-module-routing.module';

// Component
import { ReturnRequisitionDetailsWcComponent } from 'src/app/main/wc/return-requisition-wc/return-requisition-details-wc/return-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateReturnRequisitionWcComponent } from 'src/app/main/wc/return-requisition-wc/update-return-requisition-wc/update-return-requisition-wc.component';
import { AddReturnRequisitionFormWcComponent } from 'src/app/main/wc/return-requisition-wc/add-return-requisition-form-wc/add-return-requisition-form-wc.component';

@NgModule({
  declarations: [
    ReturnRequisitionDetailsWcComponent,
    UpdateReturnRequisitionWcComponent,
    AddReturnRequisitionFormWcComponent
  ],
  imports: [
    SharedModule,
    ReturnRequisitionDetailsWcModuleRoutingModule
  ]
})
export class ReturnRequisitionDetailsWcModuleModule { }
