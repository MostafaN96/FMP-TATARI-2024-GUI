import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReconcilitionRequisitionWbComponent } from '../../../../../main/wb/reconcilition-requisition-wb/add-reconcilition-requisition-wb/add-reconcilition-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: AddReconcilitionRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReconcilitionRequisitionWbModuleRoutingModule { }
