import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransportWaWbRequisitionWbComponent } from '../../../../../main/wb/transport-wa-wb-requisition-wb/show-all-transport-wa-wb-requisition-wb/show-all-transport-wa-wb-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransportWaWbRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransportWaWbModuleRoutingModule { }
