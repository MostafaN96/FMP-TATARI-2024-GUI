import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllManufacturingRequisitionWbModuleRoutingModule } from './show-all-manufacturing-requisition-wb-module-routing.module';

// Component
import { ShowAllManufacturingRequisitionWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/show-all-manufacturing-requisition-wb/show-all-manufacturing-requisition-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from 'src/app/shared-components/shared-wb-components.module';

@NgModule({
  declarations: [
    ShowAllManufacturingRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllManufacturingRequisitionWbModuleRoutingModule,

    // Shared Components
    SharedComponentsModule
  ],
  exports: [
    // Shared Components
    SharedComponentsModule
  ]
})
export class ShowAllManufacturingRequisitionWbModuleModule { }
