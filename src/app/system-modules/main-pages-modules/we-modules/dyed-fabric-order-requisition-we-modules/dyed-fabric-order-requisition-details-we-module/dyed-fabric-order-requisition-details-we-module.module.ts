import { NgModule } from '@angular/core';

// Routing Module
import { DyedFabricOrderRequisitionDetailsWeModuleRoutingModule } from './dyed-fabric-order-requisition-details-we-module-routing.module';

// Component
import { DyedFabricOrderRequisitionDetailsWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-details-we/dyed-fabric-order-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { DyedFabricOrderRequisitionAddDetailsFormWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-add-details-form-we/dyed-fabric-order-requisition-add-details-form-we.component';
import { DyedFabricOrderRequisitionUpdateWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-update-we/dyed-fabric-order-requisition-update-we.component';

@NgModule({
  declarations: [
    DyedFabricOrderRequisitionDetailsWeComponent,
    DyedFabricOrderRequisitionAddDetailsFormWeComponent,
    DyedFabricOrderRequisitionUpdateWeComponent
  ],
  imports: [
    SharedModule,
    DyedFabricOrderRequisitionDetailsWeModuleRoutingModule
  ]
})
export class DyedFabricOrderRequisitionDetailsWeModuleModule { }
