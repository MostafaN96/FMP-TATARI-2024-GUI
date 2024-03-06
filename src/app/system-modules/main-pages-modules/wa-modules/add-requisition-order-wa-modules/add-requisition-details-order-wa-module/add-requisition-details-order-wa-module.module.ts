import { NgModule } from '@angular/core';

// Routing Module
import { AddRequisitionDetailsOrderWaModuleRoutingModule } from './add-requisition-details-order-wa-module-routing.module';

// Component
import { AddRequisitionDetailsOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/add-requisition-details-order-wa/add-requisition-details-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddAddRequisitionFormDetailsOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/add-add-requisition-form-details-order-wa/add-add-requisition-form-details-order-wa.component';
import { UpdateAddRequisitionOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/update-add-requisition-order-wa/update-add-requisition-order-wa.component';

@NgModule({
  declarations: [
    AddRequisitionDetailsOrderWaComponent,
    UpdateAddRequisitionOrderWaComponent,
    AddAddRequisitionFormDetailsOrderWaComponent
  ],
  imports: [
    SharedModule,
    AddRequisitionDetailsOrderWaModuleRoutingModule
  ]
})
export class AddRequisitionDetailsOrderWaModuleModule { }
