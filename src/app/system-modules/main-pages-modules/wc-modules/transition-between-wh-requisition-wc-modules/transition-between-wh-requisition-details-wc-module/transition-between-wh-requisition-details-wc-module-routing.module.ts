import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenWhRequisitionDetailsWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/transition-between-wh-requisition-details-wc/transition-between-wh-requisition-details-wc.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenWhRequisitionDetailsWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenWhRequisitionDetailsWcModuleRoutingModule { }
