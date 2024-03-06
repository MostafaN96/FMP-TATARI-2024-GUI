import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddDyeingRequisitionWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/add-dyeing-requisition-wd/add-dyeing-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddDyeingRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddDeyingRequisitionWdModuleRoutingModule { }
