import { NgModule } from '@angular/core';

// Routing Module
import { AddTransportWbWaRequisitionWbModuleRoutingModule } from './add-transport-wb-wa-requisition-wb-module-routing.module';

// Component
import { AddTransportWbWaRequisitionWbComponent } from '../../../../../main/wb/transport-wb-wa-requisition-wb/add-transport-wb-wa-requisition-wb/add-transport-wb-wa-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransportWbWaRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    AddTransportWbWaRequisitionWbModuleRoutingModule
  ]
})
export class AddTransportWbWaRequisitionWbModuleModule { }
