import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransportWbWaRequisitionWbComponent } from '../../../../../main/wb/transport-wb-wa-requisition-wb/add-transport-wb-wa-requisition-wb/add-transport-wb-wa-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: AddTransportWbWaRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransportWbWaRequisitionWbModuleRoutingModule { }
