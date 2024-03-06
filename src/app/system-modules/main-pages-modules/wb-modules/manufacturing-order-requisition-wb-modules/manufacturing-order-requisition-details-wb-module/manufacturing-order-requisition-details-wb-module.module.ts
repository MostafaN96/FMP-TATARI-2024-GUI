import { NgModule } from '@angular/core';

// Routing Module
import { ManufacturingOrderRequisitionDetailsWbModuleRoutingModule } from './manufacturing-order-requisition-details-wb-module-routing.module';

// Component
import { ManufacturingOrderRequisitionDetailsWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-details-wb/manufacturing-order-requisition-details-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { ManufacturingOrderRequisitionAddDetailsFormWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-add-details-form-wb/manufacturing-order-requisition-add-details-form-wb.component';
import { ManufacturingOrderRequisitionUpdateWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-update-wb/manufacturing-order-requisition-update-wb.component';

@NgModule({
  declarations: [
    ManufacturingOrderRequisitionDetailsWbComponent,
    ManufacturingOrderRequisitionUpdateWbComponent,
    ManufacturingOrderRequisitionAddDetailsFormWbComponent
  ],
  imports: [
    SharedModule,
    ManufacturingOrderRequisitionDetailsWbModuleRoutingModule,
  ]
})
export class ManufacturingOrderRequisitionDetailsWbModuleModule { }
