import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReconciliationRequisitionDetailsWcComponent } from '../../../../../main/wc/reconciliation-requisition-wc/reconciliation-requisition-details-wc/reconciliation-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: ReconciliationRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReconciliationRequisitionDetailsWcModuleRoutingModule { }
