import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenOrdersRequisitionShowAllWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/transition-between-orders-requisition-show-all-we/transition-between-orders-requisition-show-all-we.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenOrdersRequisitionShowAllWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenOrdersRequisitionShowAllWeModuleRoutingModule { }
