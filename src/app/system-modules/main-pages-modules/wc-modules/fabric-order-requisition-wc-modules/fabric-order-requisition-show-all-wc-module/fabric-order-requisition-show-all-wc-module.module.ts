import { NgModule } from '@angular/core';

// Routing Module
import { FabricOrderRequisitionShowAllWcModuleRoutingModule } from './fabric-order-requisition-show-all-wc-module-routing.module';

// Component
import { FabricOrderRequisitionShowAllWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-show-all-wc/fabric-order-requisition-show-all-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FabricOrderRequisitionShowAllWcComponent
  ],
  imports: [
    SharedModule,
    FabricOrderRequisitionShowAllWcModuleRoutingModule
  ]
})
export class FabricOrderRequisitionShowAllWcModuleModule { }
