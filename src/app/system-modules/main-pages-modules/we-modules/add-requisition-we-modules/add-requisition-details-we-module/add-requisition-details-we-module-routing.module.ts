import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddRequisitionDetailsWeComponent } from '../../../../../main/we/add-requisition-we/add-requisition-details-we/add-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: AddRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddRequisitionDetailsWeModuleRoutingModule { }
