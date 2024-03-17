import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ExecuteOrderRequisitionAddWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-add-we/execute-order-requisition-add-we.component';

export const routes: Routes = [

    {

        path: '', component: ExecuteOrderRequisitionAddWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ExecuteOrderRequisitionAddWeModuleRoutingModule { }
