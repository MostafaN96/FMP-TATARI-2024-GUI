import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ManufacturingOrderRequisitionDetailsWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-details-wb/manufacturing-order-requisition-details-wb.component';

export const routes: Routes = [

    {

        path: '', component: ManufacturingOrderRequisitionDetailsWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ManufacturingOrderRequisitionDetailsWbModuleRoutingModule { }
