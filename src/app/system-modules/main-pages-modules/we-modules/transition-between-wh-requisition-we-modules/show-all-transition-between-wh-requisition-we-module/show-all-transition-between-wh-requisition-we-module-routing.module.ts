import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransitionBetweenWhRequisitionWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/show-all-transition-between-wh-requisition-we/show-all-transition-between-wh-requisition-we.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransitionBetweenWhRequisitionWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransitionBetweenWhRequisitionWeModuleRoutingModule { }
