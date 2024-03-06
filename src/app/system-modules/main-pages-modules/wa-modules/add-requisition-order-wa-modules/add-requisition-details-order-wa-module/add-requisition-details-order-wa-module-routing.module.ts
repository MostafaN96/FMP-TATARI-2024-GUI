import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddRequisitionDetailsOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/add-requisition-details-order-wa/add-requisition-details-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddRequisitionDetailsOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddRequisitionDetailsOrderWaModuleRoutingModule { }
