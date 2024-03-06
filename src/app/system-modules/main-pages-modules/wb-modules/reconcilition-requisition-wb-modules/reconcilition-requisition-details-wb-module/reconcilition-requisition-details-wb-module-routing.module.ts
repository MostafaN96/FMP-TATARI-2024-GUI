import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReconcilitionRequisitionDetailsWbComponent } from '../../../../../main/wb/reconcilition-requisition-wb/reconcilition-requisition-details-wb/reconcilition-requisition-details-wb.component';

export const routes: Routes = [

    {

        path: '', component: ReconcilitionRequisitionDetailsWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReconcilitionRequisitionDetailsWbModuleRoutingModule { }
