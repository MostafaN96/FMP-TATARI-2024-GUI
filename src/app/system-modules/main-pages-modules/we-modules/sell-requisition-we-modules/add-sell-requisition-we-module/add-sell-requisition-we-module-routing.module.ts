import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddSellRequisitionWeComponent } from 'src/app/main/we/sell-requisition-we/add-sell-requisition-we/add-sell-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: AddSellRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddSellRequisitionWeModuleRoutingModule { }
