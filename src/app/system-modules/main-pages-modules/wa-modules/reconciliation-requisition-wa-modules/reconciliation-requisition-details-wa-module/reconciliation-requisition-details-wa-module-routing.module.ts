import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReconciliationRequisitionDetailsWaComponent } from '../../../../../main/wa/reconciliation-requisition-wa/reconciliation-requisition-details-wa/reconciliation-requisition-details-wa.component';

export const routes: Routes = [

    {

        path: '', component: ReconciliationRequisitionDetailsWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReconciliationRequisitionDetailsWaModuleRoutingModule { }
