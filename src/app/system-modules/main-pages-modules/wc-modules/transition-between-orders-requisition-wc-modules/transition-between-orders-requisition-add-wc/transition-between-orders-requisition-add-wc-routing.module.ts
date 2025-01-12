import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenOrdersRequisitionWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/add-transition-between-orders-requisition-wc/add-transition-between-orders-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenOrdersRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenOrdersRequisitionAddWcRoutingModule { }
