import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransportWcWdRequisitionWcModuleRoutingModule } from './show-all-transport-wc-wd-requisition-wc-module-routing.module';

// Component
import { ShowAllTransportWcWdRequisitionWcComponent } from '../../../../../main/wc/transport-wc-wd-requisition-wc/show-all-transport-wc-wd-requisition-wc/show-all-transport-wc-wd-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransportWcWdRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransportWcWdRequisitionWcModuleRoutingModule
  ]
})
export class ShowAllTransportWcWdRequisitionWcModuleModule { }
