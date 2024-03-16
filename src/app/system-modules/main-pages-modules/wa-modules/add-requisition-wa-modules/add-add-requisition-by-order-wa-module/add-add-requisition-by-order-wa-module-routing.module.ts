import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddRequisitionByOrderWaComponent } from 'src/app/main/wa/add-requisition-wa/add-add-requisition-by-order-wa/add-add-requisition-by-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddAddRequisitionByOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddRequisitionByOrderWaModuleRoutingModule { }
