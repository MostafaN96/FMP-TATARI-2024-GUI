import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllManufacturingOrderRequisitionWbModuleRoutingModule } from './show-all-manufacturing-order-requisition-wb-module-routing.module';

// Component
import { ShowAllManufacturingOrderRequisitionWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/show-all-manufacturing-order-requisition-wb/show-all-manufacturing-order-requisition-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllManufacturingOrderRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllManufacturingOrderRequisitionWbModuleRoutingModule
  ]
})
export class ShowAllManufacturingOrderRequisitionWbModuleModule { }
