import { NgModule } from '@angular/core';

// Routing Module
import { FabricOrderRequisitionDetailsWcModuleRoutingModule } from './fabric-order-requisition-details-wc-module-routing.module';

// Component
import { FabricOrderRequisitionDetailsWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-details-wc/fabric-order-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { FabricOrderRequisitionAddDetailsFormWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-add-details-form-wc/fabric-order-requisition-add-details-form-wc.component';
import { FabricOrderRequisitionUpdateWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-update-wc/fabric-order-requisition-update-wc.component';

@NgModule({
  declarations: [
    FabricOrderRequisitionDetailsWcComponent,
    FabricOrderRequisitionAddDetailsFormWcComponent,
    FabricOrderRequisitionUpdateWcComponent
  ],
  imports: [
    SharedModule,
    FabricOrderRequisitionDetailsWcModuleRoutingModule
  ]
})
export class FabricOrderRequisitionDetailsWcModuleModule { }
