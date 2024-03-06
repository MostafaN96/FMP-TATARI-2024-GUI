import { NgModule } from '@angular/core';

// Routing Module
import { AddTransportWdWcRequisitionWdModuleRoutingModule } from './add-transport-wd-wc-requisition-wd-module-routing.module';

// Component
import { AddTransportWdWcRequisitionWdComponent } from '../../../../../main/wd/transport-wd-wc-requisition-wd/add-transport-wd-wc-requisition-wd/add-transport-wd-wc-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransportWdWcRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    AddTransportWdWcRequisitionWdModuleRoutingModule
  ]
})
export class AddTransportWdWcRequisitionWdModuleModule { }
