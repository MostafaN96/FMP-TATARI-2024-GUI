import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddRequisitionWcComponent } from '../../../../../main/wc/add-requisition-wc/add-add-requisition-wc/add-add-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddAddRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddRequisitionWcModuleRoutingModule { }
