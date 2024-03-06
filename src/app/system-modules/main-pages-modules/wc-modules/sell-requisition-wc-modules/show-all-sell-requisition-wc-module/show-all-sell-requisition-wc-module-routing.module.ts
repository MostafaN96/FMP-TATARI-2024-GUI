import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllSellRequisitionWcComponent } from '../../../../../main/wc/sell-requisition-wc/show-all-sell-requisition-wc/show-all-sell-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllSellRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllSellRequisitionWcModuleRoutingModule { }
