import { NgModule } from '@angular/core';

// Routing Module
import { DyedFabricOrderRequisitionAddWeModuleRoutingModule } from './dyed-fabric-order-requisition-add-we-module-routing.module';

// Component
import { DyedFabricOrderRequisitionAddWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-add-we/dyed-fabric-order-requisition-add-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    DyedFabricOrderRequisitionAddWeComponent
  ],
  imports: [
    SharedModule,
    DyedFabricOrderRequisitionAddWeModuleRoutingModule
  ]
})
export class DyedFabricOrderRequisitionAddWeModuleModule { }
