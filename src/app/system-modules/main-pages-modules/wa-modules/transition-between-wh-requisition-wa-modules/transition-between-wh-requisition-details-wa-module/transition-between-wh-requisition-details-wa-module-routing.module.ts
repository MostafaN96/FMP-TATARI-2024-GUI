import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenWhRequisitionDetailsWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/transition-between-wh-requisition-details-wa/transition-between-wh-requisition-details-wa.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenWhRequisitionDetailsWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenWhRequisitionDetailsWaModuleRoutingModule { }
