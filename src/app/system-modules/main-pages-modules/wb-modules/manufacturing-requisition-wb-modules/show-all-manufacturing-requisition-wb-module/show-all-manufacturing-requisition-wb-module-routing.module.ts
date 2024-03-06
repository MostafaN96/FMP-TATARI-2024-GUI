import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllManufacturingRequisitionWbComponent } from '../../../../../main/wb/manufacturing-requisition-wb/show-all-manufacturing-requisition-wb/show-all-manufacturing-requisition-wb.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllManufacturingRequisitionWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllManufacturingRequisitionWbModuleRoutingModule { }
