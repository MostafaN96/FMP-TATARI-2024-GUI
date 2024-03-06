import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReturnRequisitionWeComponent } from '../../../../../main/we/return-requisition-we/show-all-return-requisition-we/show-all-return-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReturnRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReturnRequisitionWeModuleRoutingModule { }
