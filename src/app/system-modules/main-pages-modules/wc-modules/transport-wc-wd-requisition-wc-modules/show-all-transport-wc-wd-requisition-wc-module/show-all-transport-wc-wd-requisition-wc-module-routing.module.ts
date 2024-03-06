import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransportWcWdRequisitionWcComponent } from '../../../../../main/wc/transport-wc-wd-requisition-wc/show-all-transport-wc-wd-requisition-wc/show-all-transport-wc-wd-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransportWcWdRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransportWcWdRequisitionWcModuleRoutingModule { }
