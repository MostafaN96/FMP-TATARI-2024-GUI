import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenOrdersRequisitionDetailsWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/transition-between-orders-requisition-details-wc/transition-between-orders-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenOrdersRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenOrdersRequisitionDetailsWcRoutingModule { }
