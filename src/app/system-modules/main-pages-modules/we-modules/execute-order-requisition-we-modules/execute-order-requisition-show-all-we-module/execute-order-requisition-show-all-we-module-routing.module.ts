import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ExecuteOrderRequisitionShowAllWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-show-all-we/execute-order-requisition-show-all-we.component';

export const routes: Routes = [

    {

        path: '', component: ExecuteOrderRequisitionShowAllWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ExecuteOrderRequisitionShowAllWeModuleRoutingModule { }
