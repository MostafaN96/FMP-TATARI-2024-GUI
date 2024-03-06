import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SellRequisitionDetailsComponent } from '../../../../../main/wa/sell-requisition-wa/sell-requisition-details/sell-requisition-details.component';

export const routes: Routes = [

    {

        path: '', component: SellRequisitionDetailsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SellRequisitionDetailsWaModuleRoutingModule { }
