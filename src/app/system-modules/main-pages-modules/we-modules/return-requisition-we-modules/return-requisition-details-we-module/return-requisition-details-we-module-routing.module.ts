import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ReturnRequisitionDetailsWeComponent } from 'src/app/main/we/return-requisition-we/return-requisition-details-we/return-requisition-details-we.component';

export const routes: Routes = [

    {

        path: '', component: ReturnRequisitionDetailsWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReturnRequisitionDetailsWeModuleRoutingModule { }
