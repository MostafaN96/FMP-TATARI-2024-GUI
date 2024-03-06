import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ManufacturingOrderRequisitionShowAllWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-show-all-wb/manufacturing-order-requisition-show-all-wb.component';

export const routes: Routes = [

    {

        path: '', component: ManufacturingOrderRequisitionShowAllWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ManufacturingOrderRequisitionShowAllWbModuleRoutingModule { }
