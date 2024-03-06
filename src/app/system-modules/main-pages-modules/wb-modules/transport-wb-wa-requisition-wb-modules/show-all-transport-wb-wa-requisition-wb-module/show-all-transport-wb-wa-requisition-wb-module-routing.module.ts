import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransportWbWaRequisitionWbComponent } from '../../../../../main/wb/transport-wb-wa-requisition-wb/show-all-transport-wb-wa-requisition-wb/show-all-transport-wb-wa-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransportWbWaRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransportWbWaRequisitionWbModuleRoutingModule { }
