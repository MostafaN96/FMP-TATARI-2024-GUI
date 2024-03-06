import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddSellRequisitionWcComponent } from '../../../../../main/wc/sell-requisition-wc/add-sell-requisition-wc/add-sell-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddSellRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddSellRequisitionWcModuleRoutingModule { }
