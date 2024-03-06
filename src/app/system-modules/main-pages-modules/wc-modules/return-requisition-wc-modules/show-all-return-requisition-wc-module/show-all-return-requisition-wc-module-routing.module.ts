import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReturnRequisitionWcComponent } from '../../../../../main/wc/return-requisition-wc/show-all-return-requisition-wc/show-all-return-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReturnRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReturnRequisitionWcModuleRoutingModule { }
