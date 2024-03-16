import { NgModule } from '@angular/core';

// Routing Module
import { AddRequisitionDetailsByOrderWaModuleRoutingModule } from './add-requisition-details-by-order-wa-module-routing.module';

// Component
import { AddRequisitionDetailsByOrderWaComponent } from 'src/app/main/wa/add-requisition-wa/add-requisition-details-by-order-wa/add-requisition-details-by-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddDetailsByOrderWaComponent } from 'src/app/main/wa/add-requisition-wa/add-details-by-order-wa/add-details-by-order-wa.component';
import { UpdateAddRequisitionByOrderWaComponent } from 'src/app/main/wa/add-requisition-wa/update-add-requisition-by-order-wa/update-add-requisition-by-order-wa.component';

@NgModule({
  declarations: [
    AddRequisitionDetailsByOrderWaComponent,
    UpdateAddRequisitionByOrderWaComponent,
    AddDetailsByOrderWaComponent
  ],
  imports: [
    SharedModule,
    AddRequisitionDetailsByOrderWaModuleRoutingModule
  ]
})
export class AddRequisitionDetailsByOrderWaModuleModule { }
