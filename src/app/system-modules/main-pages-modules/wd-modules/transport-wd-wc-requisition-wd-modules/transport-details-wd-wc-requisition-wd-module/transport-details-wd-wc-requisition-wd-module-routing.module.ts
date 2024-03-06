import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransportDetailsWdWcRequisitionWdComponent } from '../../../../../main/wd/transport-wd-wc-requisition-wd/transport-details-wd-wc-requisition-wd/transport-details-wd-wc-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: TransportDetailsWdWcRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransportDetailsWdWcRequisitionWdModuleRoutingModule { }
