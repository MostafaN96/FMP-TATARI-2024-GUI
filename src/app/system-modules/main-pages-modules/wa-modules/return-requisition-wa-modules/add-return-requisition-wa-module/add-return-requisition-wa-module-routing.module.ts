import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddReturnRequisitionWaComponent } from '../../../../../main/wa/return-requisition-wa/add-return-requisition-wa/add-return-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddReturnRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddReturnRequisitionWaModuleRoutingModule { }
