import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllManufacturingRequisitionWbModuleRoutingModule } from './show-all-manufacturing-requisition-wb-module-routing.module';

// Component
import { ShowAllManufacturingRequisitionWbComponent } from '../../../../../main/wb/manufacturing-requisition-wb/show-all-manufacturing-requisition-wb/show-all-manufacturing-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllManufacturingRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllManufacturingRequisitionWbModuleRoutingModule
  ]
})
export class ShowAllManufacturingRequisitionWbModuleModule { }
