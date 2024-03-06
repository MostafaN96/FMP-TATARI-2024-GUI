import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddRequisitionWeComponent } from '../../../../../main/we/add-requisition-we/add-add-requisition-we/add-add-requisition-we.component';

export const routes: Routes = [

    { path: '', component: AddAddRequisitionWeComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddRequisitionWeModuleRoutingModule { }
