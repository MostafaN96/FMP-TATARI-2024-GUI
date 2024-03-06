import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReconcilitionRequisitionWeComponent } from '../../../../../main/we/reconcilition-requisition-we/show-all-reconcilition-requisition-we/show-all-reconcilition-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReconcilitionRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReconcilitionRequisitionWeModuleRoutingModule { }
