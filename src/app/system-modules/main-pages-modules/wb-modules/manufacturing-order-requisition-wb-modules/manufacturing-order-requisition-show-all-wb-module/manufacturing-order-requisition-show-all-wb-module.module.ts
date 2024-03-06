import { NgModule } from '@angular/core';

// Routing Module
import { ManufacturingOrderRequisitionShowAllWbModuleRoutingModule } from './manufacturing-order-requisition-show-all-wb-module-routing.module';

// Component
import { ManufacturingOrderRequisitionShowAllWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-show-all-wb/manufacturing-order-requisition-show-all-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ManufacturingOrderRequisitionShowAllWbComponent
  ],
  imports: [
    SharedModule,
    ManufacturingOrderRequisitionShowAllWbModuleRoutingModule,
  ]
})
export class ManufacturingOrderRequisitionShowAllWbModuleModule { }
