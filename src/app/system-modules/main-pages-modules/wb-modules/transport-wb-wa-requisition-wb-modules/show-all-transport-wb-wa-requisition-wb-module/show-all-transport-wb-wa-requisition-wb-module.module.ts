import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransportWbWaRequisitionWbModuleRoutingModule } from './show-all-transport-wb-wa-requisition-wb-module-routing.module';

// Component
import { ShowAllTransportWbWaRequisitionWbComponent } from '../../../../../main/wb/transport-wb-wa-requisition-wb/show-all-transport-wb-wa-requisition-wb/show-all-transport-wb-wa-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransportWbWaRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransportWbWaRequisitionWbModuleRoutingModule
  ]
})
export class ShowAllTransportWbWaRequisitionWbModuleModule { }
