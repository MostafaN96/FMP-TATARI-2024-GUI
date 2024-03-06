import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAddRequisitionOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/show-all-add-requisition-order-wa/show-all-add-requisition-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAddRequisitionOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllRequisitionOrderWaModuleRoutingModule { }
