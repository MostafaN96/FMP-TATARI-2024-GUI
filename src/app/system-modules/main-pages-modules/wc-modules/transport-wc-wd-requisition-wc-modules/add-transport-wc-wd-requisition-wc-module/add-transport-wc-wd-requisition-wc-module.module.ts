import { NgModule } from '@angular/core';

// Routing Module
import { AddTransportWcWdRequisitionWcModuleRoutingModule } from './add-transport-wc-wd-requisition-wc-module-routing.module';

// Component
import { AddTransportWcWdRequisitionWcComponent } from '../../../../../main/wc/transport-wc-wd-requisition-wc/add-transport-wc-wd-requisition-wc/add-transport-wc-wd-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransportWcWdRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    AddTransportWcWdRequisitionWcModuleRoutingModule
  ]
})
export class AddTransportWcWdRequisitionWcModuleModule { }
