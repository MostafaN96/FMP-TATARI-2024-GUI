import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenOrdersRequisitionShowAllWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/transition-between-orders-requisition-show-all-wc/transition-between-orders-requisition-show-all-wc.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenOrdersRequisitionShowAllWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenOrdersRequisitionShowAllWcRoutingModule { }
