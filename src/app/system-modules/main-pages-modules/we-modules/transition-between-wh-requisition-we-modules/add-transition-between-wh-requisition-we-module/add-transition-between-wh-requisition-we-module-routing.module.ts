import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenWhRequisitionWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/add-transition-between-wh-requisition-we/add-transition-between-wh-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenWhRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransitionBetweenWhRequisitionWeModuleRoutingModule { }
