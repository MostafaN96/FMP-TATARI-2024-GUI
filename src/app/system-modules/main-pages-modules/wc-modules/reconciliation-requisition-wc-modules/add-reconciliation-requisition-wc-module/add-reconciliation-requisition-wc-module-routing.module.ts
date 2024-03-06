import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReconciliationRequisitionWcComponent } from '../../../../../main/wc/reconciliation-requisition-wc/add-reconciliation-requisition-wc/add-reconciliation-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddReconciliationRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReconciliationRequisitionWcModuleRoutingModule { }
