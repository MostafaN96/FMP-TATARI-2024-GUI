import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddRequisitionDetailsWcComponent } from '../../../../../main/wc/add-requisition-wc/add-requisition-details-wc/add-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddRequisitionDetailsWcModuleRoutingModule { }
