import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransportWaWbRequisitionWbComponent } from '../../../../../main/wb/transport-wa-wb-requisition-wb/add-transport-wa-wb-requisition-wb/add-transport-wa-wb-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: AddTransportWaWbRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransportWaWbModuleRoutingModule { }
