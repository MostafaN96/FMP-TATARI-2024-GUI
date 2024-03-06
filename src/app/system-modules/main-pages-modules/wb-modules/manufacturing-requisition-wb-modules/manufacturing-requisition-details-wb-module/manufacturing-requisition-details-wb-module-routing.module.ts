import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ManufacturingRequisitionDetailsWbComponent } from '../../../../../main/wb/manufacturing-requisition-wb/manufacturing-requisition-details-wb/manufacturing-requisition-details-wb.component';

export const routes: Routes = [

    {

        path: '', component: ManufacturingRequisitionDetailsWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ManufacturingRequisitionDetailsWbModuleRoutingModule { }
