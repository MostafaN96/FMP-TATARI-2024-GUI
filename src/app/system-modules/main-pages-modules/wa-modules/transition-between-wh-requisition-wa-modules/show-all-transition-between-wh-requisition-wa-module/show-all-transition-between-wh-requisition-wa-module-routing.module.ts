import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransitionBetweenWhRequisitionWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/show-all-transition-between-wh-requisition-wa/show-all-transition-between-wh-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransitionBetweenWhRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransitionBetweenWhRequisitionWaModuleRoutingModule { }
