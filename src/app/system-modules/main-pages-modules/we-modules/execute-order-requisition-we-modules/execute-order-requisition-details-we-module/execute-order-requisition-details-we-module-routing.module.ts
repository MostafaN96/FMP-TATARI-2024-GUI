import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ExecuteOrderRequisitionDetailsWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-details-we/execute-order-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: ExecuteOrderRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ExecuteOrderRequisitionDetailsWeModuleRoutingModule { }
