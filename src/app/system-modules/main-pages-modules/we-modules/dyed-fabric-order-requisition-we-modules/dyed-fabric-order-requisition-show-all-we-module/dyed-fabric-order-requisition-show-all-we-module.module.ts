import { NgModule } from '@angular/core';

// Routing Module
import { DyedFabricOrderRequisitionShowAllWeModuleRoutingModule } from './dyed-fabric-order-requisition-show-all-we-module-routing.module';

// Component
import { DyedFabricOrderRequisitionShowAllWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-show-all-we/dyed-fabric-order-requisition-show-all-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    DyedFabricOrderRequisitionShowAllWeComponent
  ],
  imports: [
    SharedModule,
    DyedFabricOrderRequisitionShowAllWeModuleRoutingModule
  ]
})
export class DyedFabricOrderRequisitionShowAllWeModuleModule { }
