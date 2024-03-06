import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyeingRequisitionDetailsWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/dyeing-requisition-details-wd/dyeing-requisition-details-wd.component';

export const routes: Routes = [

    {

        path: '', component: DyeingRequisitionDetailsWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DeyingRequisitionDetailsWdModuleRoutingModule { }
