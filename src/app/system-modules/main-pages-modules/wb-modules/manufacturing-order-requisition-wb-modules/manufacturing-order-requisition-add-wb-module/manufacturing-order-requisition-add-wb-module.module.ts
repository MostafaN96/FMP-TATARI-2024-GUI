import { NgModule } from '@angular/core';

// Routing Module
import { ManufacturingOrderRequisitionAddWbModuleRoutingModule } from './manufacturing-order-requisition-add-wb-module-routing.module';

// Component
import { ManufacturingOrderRequisitionAddWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-add-wb/manufacturing-order-requisition-add-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ManufacturingOrderRequisitionAddWbComponent
  ],
  imports: [
    SharedModule,
    ManufacturingOrderRequisitionAddWbModuleRoutingModule,
  ]
})
export class ManufacturingOrderRequisitionAddWbModuleModule { }
