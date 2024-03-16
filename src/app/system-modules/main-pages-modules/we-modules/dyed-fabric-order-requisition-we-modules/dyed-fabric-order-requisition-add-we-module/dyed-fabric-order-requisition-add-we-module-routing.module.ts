import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyedFabricOrderRequisitionAddWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-add-we/dyed-fabric-order-requisition-add-we.component';

export const routes: Routes = [

    {

        path: '', component: DyedFabricOrderRequisitionAddWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyedFabricOrderRequisitionAddWeModuleRoutingModule { }
