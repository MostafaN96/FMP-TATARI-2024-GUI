import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReturnSellRequisitionWeComponent } from '../../../../../main/we/return-sell-requisition-we/add-return-sell-requisition-we/add-return-sell-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: AddReturnSellRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReturnSellRequisitionWeRoutingModule { }
