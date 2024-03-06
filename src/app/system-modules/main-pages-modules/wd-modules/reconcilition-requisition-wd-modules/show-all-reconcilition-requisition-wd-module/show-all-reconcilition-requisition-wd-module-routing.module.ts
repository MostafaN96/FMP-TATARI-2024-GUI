import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReconcilitionRequisitionWdComponent } from '../../../../../main/wd/reconcilition-requisition-wd/show-all-reconcilition-requisition-wd/show-all-reconcilition-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReconcilitionRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReconcilitionRequisitionWdModuleRoutingModule { }
