import { NgModule } from '@angular/core';

// Routing Module
import { AddManufacturingRequisitionWbModuleRoutingModule } from './add-manufacturing-requisition-wb-module-routing.module';

// Component
import { AddManufacturingRequisitionWbComponent } from '../../../../../main/wb/manufacturing-requisition-wb/add-manufacturing-requisition-wb/add-manufacturing-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddManufacturingRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    AddManufacturingRequisitionWbModuleRoutingModule
  ]
})
export class AddManufacturingRequisitionWbModuleModule { }
