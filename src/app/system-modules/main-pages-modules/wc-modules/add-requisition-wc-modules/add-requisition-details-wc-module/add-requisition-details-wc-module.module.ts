import { NgModule } from '@angular/core';

// Routing Module
import { AddRequisitionDetailsWcModuleRoutingModule } from './add-requisition-details-wc-module-routing.module';

// Component
import { AddRequisitionDetailsWcComponent } from 'src/app/main/wc/add-requisition-wc/add-requisition-details-wc/add-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateAddRequisitionWcComponent } from 'src/app/main/wc/add-requisition-wc/update-add-requisition-wc/update-add-requisition-wc.component';
import { AddAddRequisitionFormWcComponent } from 'src/app/main/wc/add-requisition-wc/add-add-requisition-form-wc/add-add-requisition-form-wc.component';

@NgModule({
  declarations: [
    AddRequisitionDetailsWcComponent,
    UpdateAddRequisitionWcComponent,
    AddAddRequisitionFormWcComponent
  ],
  imports: [
    SharedModule,
    AddRequisitionDetailsWcModuleRoutingModule
  ]
})
export class AddRequisitionDetailsWcModuleModule { }
