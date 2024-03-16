import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ExecuteOrderRequisitionDetailsWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-details-wc/execute-order-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: ExecuteOrderRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ExecuteOrderRequisitionDetailsWcModuleRoutingModule { }
