import { NgModule } from '@angular/core';

// Routing Module
import { ReturnRequisitionDetailsWaModuleRoutingModule } from './return-requisition-details-wa-module-routing.module';

// Component
import { ReturnRequisitionDetailsWaComponent } from 'src/app/main/wa/return-requisition-wa/return-requisition-details-wa/return-requisition-details-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateReturnRequisitionWaComponent } from 'src/app/main/wa/return-requisition-wa/update-return-requisition-wa/update-return-requisition-wa.component';
import { AddReturnRequisitionFormWaComponent } from 'src/app/main/wa/return-requisition-wa/add-return-requisition-form-wa/add-return-requisition-form-wa.component';

@NgModule({
  declarations: [
    ReturnRequisitionDetailsWaComponent,
    UpdateReturnRequisitionWaComponent,
    AddReturnRequisitionFormWaComponent

  ],
  imports: [
    SharedModule,
    ReturnRequisitionDetailsWaModuleRoutingModule
  ]
})
export class ReturnRequisitionDetailsWaModuleModule { }
