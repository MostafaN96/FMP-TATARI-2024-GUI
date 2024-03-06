import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReconciliationRequisitionWaComponent } from '../../../../../main/wa/reconciliation-requisition-wa/show-all-reconciliation-requisition-wa/show-all-reconciliation-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReconciliationRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReconciliationRequisitionWaModuleRoutingModule { }
