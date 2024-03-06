import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ManufacturingOrderRequisitionAddWbComponent } from 'src/app/main/wb/manufacturing-order-requisition-wb/manufacturing-order-requisition-add-wb/manufacturing-order-requisition-add-wb.component';

export const routes: Routes = [

    {

        path: '', component: ManufacturingOrderRequisitionAddWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ManufacturingOrderRequisitionAddWbModuleRoutingModule { }
