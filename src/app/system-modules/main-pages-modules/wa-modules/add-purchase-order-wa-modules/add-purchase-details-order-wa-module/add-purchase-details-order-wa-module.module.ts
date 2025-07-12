import { NgModule } from '@angular/core';

// Routing Module
import { AddPurchaseDetailsOrderWaModuleRoutingModule } from './add-purchase-details-order-wa-module-routing.module';

// Component
import { AddPurchaseDetailsOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/add-purchase-details-order-wa/add-purchase-details-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddAddPurchaseFormDetailsOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/add-add-purchase-form-details-order-wa/add-add-purchase-form-details-order-wa.component';
import { UpdatePurchaseOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/update-purchase-order-wa/update-purchase-order-wa.component';
// import { UpdateAddRequisitionOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/update-add-requisition-order-wa/update-add-requisition-order-wa.component';

@NgModule({
  declarations: [
    AddPurchaseDetailsOrderWaComponent,
    UpdatePurchaseOrderWaComponent,
    // UpdateAddRequisitionOrderWaComponent,
    AddAddPurchaseFormDetailsOrderWaComponent
  ],
  imports: [
    SharedModule,
    AddPurchaseDetailsOrderWaModuleRoutingModule
  ]
})
export class AddPurchaseDetailsOrderWaModuleModule { }
