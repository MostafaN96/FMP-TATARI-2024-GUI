import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransportWdWcRequisitionWdComponent } from '../../../../../main/wd/transport-wd-wc-requisition-wd/show-all-transport-wd-wc-requisition-wd/show-all-transport-wd-wc-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransportWdWcRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransportWdWcRequisitionWdModuleRoutingModule { }
