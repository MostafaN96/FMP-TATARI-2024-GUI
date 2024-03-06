import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SellRequisitionDetailsWcComponent } from '../../../../../main/wc/sell-requisition-wc/sell-requisition-details-wc/sell-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: SellRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SellRequisitionDetailsWcModuleRoutingModule { }
