import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenOrdersRequisitionDetailsWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/transition-between-orders-requisition-details-we/transition-between-orders-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenOrdersRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenOrdersRequisitionDetailsWeModuleRoutingModule { }
