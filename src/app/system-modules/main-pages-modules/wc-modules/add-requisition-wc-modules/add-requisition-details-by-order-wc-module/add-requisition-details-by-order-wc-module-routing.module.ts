import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddRequisitionDetailsByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/add-requisition-details-by-order-wc/add-requisition-details-by-order-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddRequisitionDetailsByOrderWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddRequisitionDetailsByOrderWcModuleRoutingModule { }
