import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReturnSellRequisitionDetailsWeComponent } from 'src/app/main/we/return-sell-requisition-we/return-sell-requisition-details-we/return-sell-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: ReturnSellRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReturnSellRequisitionDetailsWeRoutingModule { }
