import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReconcilitionRequisitionWeComponent } from '../../../../../main/we/reconcilition-requisition-we/add-reconcilition-requisition-we/add-reconcilition-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: AddReconcilitionRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReconcilitionRequisitionWeModuleRoutingModule { }
