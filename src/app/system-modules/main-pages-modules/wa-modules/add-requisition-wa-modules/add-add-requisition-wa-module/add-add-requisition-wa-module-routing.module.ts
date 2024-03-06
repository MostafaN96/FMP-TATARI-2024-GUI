import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddRequisitionWaComponent } from 'src/app/main/wa/add-requisition-wa/add-add-requisition-wa/add-add-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddAddRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddRequisitionWaModuleRoutingModule { }
