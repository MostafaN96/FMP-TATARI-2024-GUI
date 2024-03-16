import { NgModule } from '@angular/core';

// Routing Module
import { FabricOrderRequisitionAddWcModuleRoutingModule } from './fabric-order-requisition-add-wc-module-routing.module';

// Component
import { FabricOrderRequisitionAddWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-add-wc/fabric-order-requisition-add-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FabricOrderRequisitionAddWcComponent
  ],
  imports: [
    SharedModule,
    FabricOrderRequisitionAddWcModuleRoutingModule
  ]
})
export class FabricOrderRequisitionAddWcModuleModule { }
