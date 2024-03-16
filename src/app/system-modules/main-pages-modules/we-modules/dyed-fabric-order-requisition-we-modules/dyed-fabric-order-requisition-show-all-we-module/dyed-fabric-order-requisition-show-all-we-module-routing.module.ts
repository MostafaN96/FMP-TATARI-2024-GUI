import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyedFabricOrderRequisitionShowAllWeComponent } from 'src/app/main/we/dyed-fabric-order-requisition-we/dyed-fabric-order-requisition-show-all-we/dyed-fabric-order-requisition-show-all-we.component';

export const routes: Routes = [

    {

        path: '', component: DyedFabricOrderRequisitionShowAllWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyedFabricOrderRequisitionShowAllWeModuleRoutingModule { }
