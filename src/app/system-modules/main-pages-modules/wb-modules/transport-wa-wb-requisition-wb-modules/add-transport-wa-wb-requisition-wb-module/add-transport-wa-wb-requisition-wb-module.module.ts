import { NgModule } from '@angular/core';

// Routing Module
import { AddTransportWaWbModuleRoutingModule } from './add-transport-wa-wb-requisition-wb-module-routing.module';

// Component
import { AddTransportWaWbRequisitionWbComponent } from '../../../../../main/wb/transport-wa-wb-requisition-wb/add-transport-wa-wb-requisition-wb/add-transport-wa-wb-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransportWaWbRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    AddTransportWaWbModuleRoutingModule
  ]
})
export class AddTransportWaWbModuleModule { }
