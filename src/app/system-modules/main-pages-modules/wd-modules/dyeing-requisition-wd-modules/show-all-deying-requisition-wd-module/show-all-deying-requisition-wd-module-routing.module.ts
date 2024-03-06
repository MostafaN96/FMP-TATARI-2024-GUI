import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllDyeingRequisitionWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/show-all-dyeing-requisition-wd/show-all-dyeing-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllDyeingRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllDeyingRequisitionWdModuleRoutingModule { }
