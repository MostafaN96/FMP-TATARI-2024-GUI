import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAddRequisitionByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/show-all-add-requisition-by-order-wc/show-all-add-requisition-by-order-wc.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAddRequisitionByOrderWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAddRequisitionByOrderWcModuleRoutingModule { }
