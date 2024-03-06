import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllFormDyeingRequisitionWdComponent } from '../../../../../main/wd/form-dyeing-requisition-wd/show-all-form-dyeing-requisition-wd/show-all-form-dyeing-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllFormDyeingRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllFormDyeingRequisitionWdModuleRoutingModule { }
