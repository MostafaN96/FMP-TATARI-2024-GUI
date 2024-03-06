import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllReturnRequisitionWaComponent } from '../../../../../main/wa/return-requisition-wa/show-all-return-requisition-wa/show-all-return-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllReturnRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllReturnRequisitionWaModuleRoutingModule { }
