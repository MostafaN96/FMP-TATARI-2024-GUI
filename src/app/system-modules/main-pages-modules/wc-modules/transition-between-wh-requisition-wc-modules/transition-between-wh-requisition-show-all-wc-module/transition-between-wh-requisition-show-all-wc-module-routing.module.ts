import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenWhRequisitionShowAllWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/transition-between-wh-requisition-show-all-wc/transition-between-wh-requisition-show-all-wc.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenWhRequisitionShowAllWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenWhRequisitionShowAllWcModuleRoutingModule { }
