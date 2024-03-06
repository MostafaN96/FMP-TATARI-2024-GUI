import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransportWdWcRequisitionWdModuleRoutingModule } from './show-all-transport-wd-wc-requisition-wd-module-routing.module';

// Component
import { ShowAllTransportWdWcRequisitionWdComponent } from '../../../../../main/wd/transport-wd-wc-requisition-wd/show-all-transport-wd-wc-requisition-wd/show-all-transport-wd-wc-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransportWdWcRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransportWdWcRequisitionWdModuleRoutingModule
  ]
})
export class ShowAllTransportWdWcRequisitionWdModuleModule { }
