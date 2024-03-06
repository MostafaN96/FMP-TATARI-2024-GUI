import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReconcilitionRequisitionWdComponent } from '../../../../../main/wd/reconcilition-requisition-wd/add-reconcilition-requisition-wd/add-reconcilition-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddReconcilitionRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReconcilitionRequisitionWdModuleRoutingModule { }
