import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricOrderRequisitionShowAllWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-show-all-wc/fabric-order-requisition-show-all-wc.component';

export const routes: Routes = [

    {

        path: '', component: FabricOrderRequisitionShowAllWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricOrderRequisitionShowAllWcModuleRoutingModule { }
