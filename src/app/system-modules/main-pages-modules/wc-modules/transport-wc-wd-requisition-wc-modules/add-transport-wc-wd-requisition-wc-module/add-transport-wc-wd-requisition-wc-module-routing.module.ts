import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransportWcWdRequisitionWcComponent } from '../../../../../main/wc/transport-wc-wd-requisition-wc/add-transport-wc-wd-requisition-wc/add-transport-wc-wd-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddTransportWcWdRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransportWcWdRequisitionWcModuleRoutingModule { }
