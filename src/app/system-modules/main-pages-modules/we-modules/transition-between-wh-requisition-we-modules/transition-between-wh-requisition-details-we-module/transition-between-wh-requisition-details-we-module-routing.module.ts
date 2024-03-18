import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenWhRequisitionDetailsWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/transition-between-wh-requisition-details-we/transition-between-wh-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenWhRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenWhRequisitionDetailsWeModuleRoutingModule { }
