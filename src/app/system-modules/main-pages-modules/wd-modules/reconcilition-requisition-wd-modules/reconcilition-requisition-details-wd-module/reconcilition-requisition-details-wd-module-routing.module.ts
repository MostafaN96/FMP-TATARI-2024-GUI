import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReconcilitionRequisitionDetailsWdComponent } from '../../../../../main/wd/reconcilition-requisition-wd/reconcilition-requisition-details-wd/reconcilition-requisition-details-wd.component';

export const routes: Routes = [

    {

        path: '', component: ReconcilitionRequisitionDetailsWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReconcilitionRequisitionDetailsWdModuleRoutingModule { }
