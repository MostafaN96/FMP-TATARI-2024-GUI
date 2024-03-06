import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReconciliationRequisitionWcComponent } from '../../../../../main/wc/reconciliation-requisition-wc/show-all-reconciliation-requisition-wc/show-all-reconciliation-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReconciliationRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReconciliationRequisitionWcModuleRoutingModule { }
