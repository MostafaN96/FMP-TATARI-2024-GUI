import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddManufacturingRequisitionByOrderWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/add-manufacturing-requisition-by-order-wb/add-manufacturing-requisition-by-order-wb.component';

export const routes: Routes = [

    {

        path: '', component: AddManufacturingRequisitionByOrderWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddManufacturingRequisitionByOrderWbModuleRoutingModule { }
