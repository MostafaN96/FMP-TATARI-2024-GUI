import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricOrderRequisitionDetailsWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-details-wc/fabric-order-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: FabricOrderRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricOrderRequisitionDetailsWcModuleRoutingModule { }
