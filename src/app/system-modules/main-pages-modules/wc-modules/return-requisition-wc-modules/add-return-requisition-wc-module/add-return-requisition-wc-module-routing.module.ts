import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReturnRequisitionWcComponent } from '../../../../../main/wc/return-requisition-wc/add-return-requisition-wc/add-return-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddReturnRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReturnRequisitionWcModuleRoutingModule { }
