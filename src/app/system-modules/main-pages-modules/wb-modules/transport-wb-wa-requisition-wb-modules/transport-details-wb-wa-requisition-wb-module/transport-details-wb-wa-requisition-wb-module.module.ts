import { NgModule } from '@angular/core';

// Routing Module
import { TransportDetailsWbWaRequisitionWbModuleRoutingModule } from './transport-details-wb-wa-requisition-wb-module-routing.module';

// Component
import { TransportDetailsWbWaRequisitionWbComponent } from 'src/app/main/wb/transport-wb-wa-requisition-wb/transport-details-wb-wa-requisition-wb/transport-details-wb-wa-requisition-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateTransportWbWaRequisitionWbComponent } from 'src/app/main/wb/transport-wb-wa-requisition-wb/update-transport-wb-wa-requisition-wb/update-transport-wb-wa-requisition-wb.component';
import { WbTransportRequisitionWbWaFormAddDetailsComponent } from 'src/app/main/wb/transport-wb-wa-requisition-wb/wb-transport-requisition-wb-wa-form-add-details/wb-transport-requisition-wb-wa-form-add-details.component';

@NgModule({
  declarations: [
    TransportDetailsWbWaRequisitionWbComponent,
    UpdateTransportWbWaRequisitionWbComponent,
    WbTransportRequisitionWbWaFormAddDetailsComponent
  ],
  imports: [
    SharedModule,
    TransportDetailsWbWaRequisitionWbModuleRoutingModule
  ]
})
export class TransportDetailsWbWaRequisitionWbModuleModule { }
