import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ExecuteOrderRequisitionShowAllWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-show-all-wc/execute-order-requisition-show-all-wc.component';

export const routes: Routes = [

    {

        path: '', component: ExecuteOrderRequisitionShowAllWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ExecuteOrderRequisitionShowAllWcModuleRoutingModule { }
