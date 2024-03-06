import { NgModule } from '@angular/core';

// Routing Module
import { ManufacturingRequisitionDetailsWbModuleRoutingModule } from './manufacturing-requisition-details-wb-module-routing.module';

// Component
import { ManufacturingRequisitionDetailsWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/manufacturing-requisition-details-wb/manufacturing-requisition-details-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Component
import { ManufacturingRequisitionOutputDetailsWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/manufacturing-requisition-details-wb/manufacturing-requisition-output-details-wb/manufacturing-requisition-output-details-wb.component';

// Import Child Component
import { UpdateManufacturingOutputComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufacturing-output/update-manufacturing-output.component';
import { AddManufaturingRequisitionFormWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/add-manufaturing-requisition-form-wb/add-manufaturing-requisition-form-wb.component';

// Shared Components
import { SharedComponentsModule } from 'src/app/shared-components/shared-wb-components.module';

@NgModule({
  declarations: [
    ManufacturingRequisitionDetailsWbComponent,
    UpdateManufacturingOutputComponent,
    AddManufaturingRequisitionFormWbComponent,

    // Shared Component
    ManufacturingRequisitionOutputDetailsWbComponent,
  ],
  imports: [
    SharedModule,
    ManufacturingRequisitionDetailsWbModuleRoutingModule,

    // Shared Components
    SharedComponentsModule
  ],
  exports: [
    // Shared Components
    SharedComponentsModule
  ]
})
export class ManufacturingRequisitionDetailsWbModuleModule { }
