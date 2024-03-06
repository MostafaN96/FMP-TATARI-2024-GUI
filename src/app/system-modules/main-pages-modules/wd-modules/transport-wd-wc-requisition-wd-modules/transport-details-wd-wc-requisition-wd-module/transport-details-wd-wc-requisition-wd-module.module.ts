import { NgModule } from '@angular/core';

// Routing Module
import { TransportDetailsWdWcRequisitionWdModuleRoutingModule } from './transport-details-wd-wc-requisition-wd-module-routing.module';

// Component
import { TransportDetailsWdWcRequisitionWdComponent } from 'src/app/main/wd/transport-wd-wc-requisition-wd/transport-details-wd-wc-requisition-wd/transport-details-wd-wc-requisition-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateTransportWdWcRequisitionWdComponent } from 'src/app/main/wd/transport-wd-wc-requisition-wd/update-transport-wd-wc-requisition-wd/update-transport-wd-wc-requisition-wd.component';
import { TransportWdWcRequisitionFormWdComponent } from 'src/app/main/wd/transport-wd-wc-requisition-wd/transport-wd-wc-requisition-form-wd/transport-wd-wc-requisition-form-wd.component';

@NgModule({
  declarations: [
    TransportDetailsWdWcRequisitionWdComponent,
    UpdateTransportWdWcRequisitionWdComponent,
    TransportWdWcRequisitionFormWdComponent
  ],
  imports: [
    SharedModule,
    TransportDetailsWdWcRequisitionWdModuleRoutingModule
  ]
})
export class TransportDetailsWdWcRequisitionWdModuleModule { }
