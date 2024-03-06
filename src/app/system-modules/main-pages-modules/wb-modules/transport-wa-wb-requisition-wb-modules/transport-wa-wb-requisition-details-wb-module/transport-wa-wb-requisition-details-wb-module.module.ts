import { NgModule } from '@angular/core';

// Routing Module
import { TransportWaWbDetailsModuleRoutingModule } from './transport-wa-wb-requisition-details-wb-module-routing.module';

// Component
import { TransportDetailsWaWbRequisitionWbComponent } from 'src/app/main/wb/transport-wa-wb-requisition-wb/transport-details-wa-wb-requisition-wb/transport-details-wa-wb-requisition-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateTransportWaWbRequisitionWbComponent } from 'src/app/main/wb/transport-wa-wb-requisition-wb/update-transport-wa-wb-requisition-wb/update-transport-wa-wb-requisition-wb.component';
import { AddTransportWaWbRequisitionFormWbComponent } from 'src/app/main/wb/transport-wa-wb-requisition-wb/add-transport-wa-wb-requisition-form-wb/add-transport-wa-wb-requisition-form-wb.component';
import { TransportShortDetailsWaWbRequisitionWbComponent } from 'src/app/main/wb/transport-wa-wb-requisition-wb/transport-short-details-wa-wb-requisition-wb/transport-short-details-wa-wb-requisition-wb.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    TransportDetailsWaWbRequisitionWbComponent,
    UpdateTransportWaWbRequisitionWbComponent,
    AddTransportWaWbRequisitionFormWbComponent,
    TransportShortDetailsWaWbRequisitionWbComponent,
  ],
  imports: [
    SharedModule,
    TransportWaWbDetailsModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class TransportWaWbDetailsModuleModule { }
