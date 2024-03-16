import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenWhRequisitionWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/add-transition-between-wh-requisition-wa/add-transition-between-wh-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenWhRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransitionBetweenWhRequisitionWaModuleRoutingModule { }
