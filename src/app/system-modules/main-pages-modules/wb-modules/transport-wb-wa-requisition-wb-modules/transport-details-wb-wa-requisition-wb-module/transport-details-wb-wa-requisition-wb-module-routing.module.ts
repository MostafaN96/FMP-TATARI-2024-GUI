import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransportDetailsWbWaRequisitionWbComponent } from '../../../../../main/wb/transport-wb-wa-requisition-wb/transport-details-wb-wa-requisition-wb/transport-details-wb-wa-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: TransportDetailsWbWaRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransportDetailsWbWaRequisitionWbModuleRoutingModule { }
