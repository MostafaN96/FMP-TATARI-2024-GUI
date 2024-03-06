import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllSellRequisitionWeComponent } from '../../../../../main/we/sell-requisition-we/show-all-sell-requisition-we/show-all-sell-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllSellRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllSellRequisitionWeModuleRoutingModule { }
