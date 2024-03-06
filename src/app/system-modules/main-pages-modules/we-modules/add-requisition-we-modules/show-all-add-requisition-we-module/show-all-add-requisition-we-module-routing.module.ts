import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAddRequisitionWeComponent } from '../../../../../main/we/add-requisition-we/show-all-add-requisition-we/show-all-add-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAddRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAddRequisitionWeModuleRoutingModule { }
