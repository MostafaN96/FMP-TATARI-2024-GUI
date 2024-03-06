import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddSellRequisitionWaComponent } from '../../../../../main/wa/sell-requisition-wa/add-sell-requisition-wa/add-sell-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddSellRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddSellRequisitionWaModuleRoutingModule { }
