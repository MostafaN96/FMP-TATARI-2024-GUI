import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReconcilitionRequisitionDetailsWeComponent } from '../../../../../main/we/reconcilition-requisition-we/reconcilition-requisition-details-we/reconcilition-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: ReconcilitionRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReconcilitionRequisitionDetailsWeModuleRoutingModule { }
