import { NgModule } from '@angular/core';

// Routing Module
import { AddRequisitionDetailsByOrderWcModuleRoutingModule } from './add-requisition-details-by-order-wc-module-routing.module';

// Component
import { AddRequisitionDetailsByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/add-requisition-details-by-order-wc/add-requisition-details-by-order-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddDetailsFormByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/add-details-form-by-order-wc/add-details-form-by-order-wc.component';
import { UpdateAddRequisitionByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/update-add-requisition-by-order-wc/update-add-requisition-by-order-wc.component';

@NgModule({
  declarations: [
    AddRequisitionDetailsByOrderWcComponent,
    AddDetailsFormByOrderWcComponent,
    UpdateAddRequisitionByOrderWcComponent
  ],
  imports: [
    SharedModule,
    AddRequisitionDetailsByOrderWcModuleRoutingModule
  ]
})
export class AddRequisitionDetailsByOrderWcModuleModule { }
