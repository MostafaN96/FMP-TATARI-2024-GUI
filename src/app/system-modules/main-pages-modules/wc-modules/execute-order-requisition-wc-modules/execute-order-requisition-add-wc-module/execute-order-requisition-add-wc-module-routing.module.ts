import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ExecuteOrderRequisitionAddWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-add-wc/execute-order-requisition-add-wc.component';

export const routes: Routes = [

    {

        path: '', component: ExecuteOrderRequisitionAddWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ExecuteOrderRequisitionAddWcModuleRoutingModule { }
