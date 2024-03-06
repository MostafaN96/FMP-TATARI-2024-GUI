import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SellRequisitionDirectDetailsWeComponent } from 'src/app/main/we/sell-requisition-we/sell-requisition-direct-details-we/sell-requisition-direct-details-we.component';

export const routes: Routes = [

    {

        path: '', component: SellRequisitionDirectDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SellRequisitionDirectDetailsWeModuleRoutingModule { }
