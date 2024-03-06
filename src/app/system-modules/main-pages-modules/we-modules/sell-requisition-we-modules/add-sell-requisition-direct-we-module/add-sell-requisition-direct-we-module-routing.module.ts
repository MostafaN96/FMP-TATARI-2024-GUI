import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddSellRequisitionDirectWeComponent } from 'src/app/main/we/sell-requisition-we/add-sell-requisition-direct-we/add-sell-requisition-direct-we.component';

export const routes: Routes = [

    {

        path: '', component: AddSellRequisitionDirectWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddSellRequisitionDirectWeModuleRoutingModule { }
