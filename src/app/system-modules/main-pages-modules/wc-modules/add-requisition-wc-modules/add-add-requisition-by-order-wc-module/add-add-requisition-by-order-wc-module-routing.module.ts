import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddRequisitionByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/add-add-requisition-by-order-wc/add-add-requisition-by-order-wc.component';

export const routes: Routes = [

    {

        path: '', component: AddAddRequisitionByOrderWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddRequisitionByOrderWcModuleRoutingModule { }
