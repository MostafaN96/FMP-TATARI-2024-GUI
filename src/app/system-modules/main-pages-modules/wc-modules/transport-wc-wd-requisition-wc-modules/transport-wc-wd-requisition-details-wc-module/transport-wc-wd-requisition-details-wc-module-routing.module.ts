import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransportWcWdRequisitionDetailsWcComponent } from 'src/app/main/wc/transport-wc-wd-requisition-wc/transport-wc-wd-requisition-details-wc/transport-wc-wd-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: TransportWcWdRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransportWcWdRequisitionDetailsWcModuleRoutingModule { }
