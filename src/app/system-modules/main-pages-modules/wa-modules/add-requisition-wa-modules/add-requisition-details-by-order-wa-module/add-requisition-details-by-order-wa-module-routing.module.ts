import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddRequisitionDetailsByOrderWaComponent } from 'src/app/main/wa/add-requisition-wa/add-requisition-details-by-order-wa/add-requisition-details-by-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddRequisitionDetailsByOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddRequisitionDetailsByOrderWaModuleRoutingModule { }
