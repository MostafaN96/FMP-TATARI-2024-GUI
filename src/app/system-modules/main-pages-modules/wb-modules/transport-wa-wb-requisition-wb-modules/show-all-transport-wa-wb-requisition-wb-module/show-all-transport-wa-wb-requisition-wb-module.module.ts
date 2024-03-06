import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransportWaWbModuleRoutingModule } from './show-all-transport-wa-wb-requisition-wb-module-routing.module';

// Component
import { ShowAllTransportWaWbRequisitionWbComponent } from '../../../../../main/wb/transport-wa-wb-requisition-wb/show-all-transport-wa-wb-requisition-wb/show-all-transport-wa-wb-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransportWaWbRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransportWaWbModuleRoutingModule
  ]
})
export class ShowAllTransportWaWbModuleModule { }
