import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SellRequisitionDetalisWeComponent } from '../../../../../main/we/sell-requisition-we/sell-requisition-detalis-we/sell-requisition-detalis-we.component';

export const routes: Routes = [

    {

        path: '', component: SellRequisitionDetalisWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SellRequisitionDetalisWeModuleRoutingModule { }
