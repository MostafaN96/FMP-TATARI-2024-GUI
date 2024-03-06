import { NgModule } from '@angular/core';

import { UpdateManufacturingInputComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufacturing-input/update-manufacturing-input.component';

// Shared Module
import { SharedModule } from '../shared-modules/shared.module';

@NgModule({
  declarations: [
    UpdateManufacturingInputComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    UpdateManufacturingInputComponent
  ]
})
export class SharedComponentsModule { }
