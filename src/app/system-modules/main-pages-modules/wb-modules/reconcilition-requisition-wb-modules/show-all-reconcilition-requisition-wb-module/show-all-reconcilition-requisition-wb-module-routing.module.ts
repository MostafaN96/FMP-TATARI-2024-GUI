import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReconcilitionRequisitionWbComponent } from '../../../../../main/wb/reconcilition-requisition-wb/show-all-reconcilition-requisition-wb/show-all-reconcilition-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReconcilitionRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReconcilitionRequisitionWbModuleRoutingModule { }
