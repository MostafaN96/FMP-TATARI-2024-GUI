import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenWhRequisitionWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/add-transition-between-wh-requisition-wc/add-transition-between-wh-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenWhRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenWhRequisitionAddWcModuleRoutingModule { }
