import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyedFabricOrderRequisitionDetailsWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-details-we/dyed-fabric-order-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: DyedFabricOrderRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyedFabricOrderRequisitionDetailsWeModuleRoutingModule { }
