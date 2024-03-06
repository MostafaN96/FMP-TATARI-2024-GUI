import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReconciliationRequisitionWaComponent } from '../../../../../main/wa/reconciliation-requisition-wa/add-reconciliation-requisition-wa/add-reconciliation-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddReconciliationRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReconciliationRequisitionWaModuleRoutingModule { }
