import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransportDetailsWaWbRequisitionWbComponent } from 'src/app/main/wb/transport-wa-wb-requisition-wb/transport-details-wa-wb-requisition-wb/transport-details-wa-wb-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: TransportDetailsWaWbRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransportWaWbDetailsModuleRoutingModule { }
