import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { WbManufacturingRequisitionInputDetailsOrderComponent } from 'src/app/main/wb/manufacturing-requisition-wb/wb-manufacturing-requisition-input-details-order/wb-manufacturing-requisition-input-details-order.component';

export const routes: Routes = [

    {

        path: '', component: WbManufacturingRequisitionInputDetailsOrderComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class WbManufacturingRequisitionInputDetailsOrderModuleRoutingModule { }
