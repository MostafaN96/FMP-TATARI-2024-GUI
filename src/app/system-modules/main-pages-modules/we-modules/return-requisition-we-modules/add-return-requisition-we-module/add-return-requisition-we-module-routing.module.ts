import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReturnRequisitionWeComponent } from '../../../../../main/we/return-requisition-we/add-return-requisition-we/add-return-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: AddReturnRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReturnRequisitionWeModuleRoutingModule { }
