import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricOrderRequisitionAddWcComponent } from 'src/app/main/wc/fabric-order-requisition-wc/fabric-order-requisition-add-wc/fabric-order-requisition-add-wc.component';

export const routes: Routes = [

    {

        path: '', component: FabricOrderRequisitionAddWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricOrderRequisitionAddWcModuleRoutingModule { }
