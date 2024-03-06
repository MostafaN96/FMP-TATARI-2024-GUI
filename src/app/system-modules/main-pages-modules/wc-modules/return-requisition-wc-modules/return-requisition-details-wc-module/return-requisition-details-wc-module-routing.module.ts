import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReturnRequisitionDetailsWcComponent } from '../../../../../main/wc/return-requisition-wc/return-requisition-details-wc/return-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: ReturnRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReturnRequisitionDetailsWcModuleRoutingModule { }
