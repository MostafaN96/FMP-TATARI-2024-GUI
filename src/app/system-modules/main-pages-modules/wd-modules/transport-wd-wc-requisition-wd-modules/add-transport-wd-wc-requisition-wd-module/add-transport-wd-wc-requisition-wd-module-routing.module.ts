import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransportWdWcRequisitionWdComponent } from '../../../../../main/wd/transport-wd-wc-requisition-wd/add-transport-wd-wc-requisition-wd/add-transport-wd-wc-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddTransportWdWcRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransportWdWcRequisitionWdModuleRoutingModule { }
