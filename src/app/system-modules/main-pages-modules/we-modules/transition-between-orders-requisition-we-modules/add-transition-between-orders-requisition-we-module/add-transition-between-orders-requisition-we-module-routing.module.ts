import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenOrdersRequisitionWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/add-transition-between-orders-requisition-we/add-transition-between-orders-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenOrdersRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransitionBetweenOrdersRequisitionWeModuleRoutingModule { }
