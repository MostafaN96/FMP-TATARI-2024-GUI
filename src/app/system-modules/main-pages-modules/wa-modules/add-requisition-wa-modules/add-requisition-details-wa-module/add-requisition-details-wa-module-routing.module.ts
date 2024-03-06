import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddRequisitionDetailsWaComponent } from 'src/app/main/wa/add-requisition-wa/add-requisition-details-wa/add-requisition-details-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddRequisitionDetailsWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddRequisitionDetailsModuleRoutingModule { }
