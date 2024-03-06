import { NgModule } from '@angular/core';

// Routing Module
import { TransportWcWdRequisitionDetailsWcModuleRoutingModule } from './transport-wc-wd-requisition-details-wc-module-routing.module';

// Component
import { TransportWcWdRequisitionDetailsWcComponent } from 'src/app/main/wc/transport-wc-wd-requisition-wc/transport-wc-wd-requisition-details-wc/transport-wc-wd-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateTransportWcWdRequisitionWcComponent } from 'src/app/main/wc/transport-wc-wd-requisition-wc/update-transport-wc-wd-requisition-wc/update-transport-wc-wd-requisition-wc.component';
import { AddTransportWcWdRequisitionFormWcComponent } from 'src/app/main/wc/transport-wc-wd-requisition-wc/add-transport-wc-wd-requisition-form-wc/add-transport-wc-wd-requisition-form-wc.component';

@NgModule({
  declarations: [
    TransportWcWdRequisitionDetailsWcComponent,
    UpdateTransportWcWdRequisitionWcComponent,
    AddTransportWcWdRequisitionFormWcComponent
  ],
  imports: [
    SharedModule,
    TransportWcWdRequisitionDetailsWcModuleRoutingModule
  ]
})
export class TransportWcWdRequisitionDetailsWcModuleModule { }
