import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllManufacturingOrderRequisitionWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/show-all-manufacturing-order-requisition-wb/show-all-manufacturing-order-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllManufacturingOrderRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllManufacturingOrderRequisitionWbModuleRoutingModule { }
