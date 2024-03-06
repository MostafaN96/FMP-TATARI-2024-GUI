import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddRequisitionOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/add-add-requisition-order-wa/add-add-requisition-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddAddRequisitionOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddRequisitionOrderWaModuleRoutingModule { }
