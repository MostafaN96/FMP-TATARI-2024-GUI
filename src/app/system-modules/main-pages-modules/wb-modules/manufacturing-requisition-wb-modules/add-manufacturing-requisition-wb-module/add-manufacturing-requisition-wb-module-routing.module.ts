import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddManufacturingRequisitionWbComponent } from '../../../../../main/wb/manufacturing-requisition-wb/add-manufacturing-requisition-wb/add-manufacturing-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: AddManufacturingRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddManufacturingRequisitionWbModuleRoutingModule { }
