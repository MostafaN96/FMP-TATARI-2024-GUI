import { NgModule } from '@angular/core';

import { UpdateManufacturingInputComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufacturing-input/update-manufacturing-input.component';
import { UpdateManufacturingRequisitionStatusWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufacturing-requisition-status-wb/update-manufacturing-requisition-status-wb.component';

// Shared Module
import { SharedModule } from '../shared-modules/shared.module';

@NgModule({
  declarations: [
    UpdateManufacturingInputComponent,
    UpdateManufacturingRequisitionStatusWbComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    UpdateManufacturingInputComponent,
    UpdateManufacturingRequisitionStatusWbComponent
  ]
})
export class SharedComponentsModule { }
