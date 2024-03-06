import { NgModule } from '@angular/core';

// Routing Module
import { AddManufacturingRequisitionByOrderWbModuleRoutingModule } from './add-manufacturing-requisition-by-order-wb-module-routing.module';

// Component
import { AddManufacturingRequisitionByOrderWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/add-manufacturing-requisition-by-order-wb/add-manufacturing-requisition-by-order-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddManufacturingRequisitionByOrderWbComponent
  ],
  imports: [
    SharedModule,
    AddManufacturingRequisitionByOrderWbModuleRoutingModule
  ]
})
export class AddManufacturingRequisitionByOrderWbModuleModule { }
