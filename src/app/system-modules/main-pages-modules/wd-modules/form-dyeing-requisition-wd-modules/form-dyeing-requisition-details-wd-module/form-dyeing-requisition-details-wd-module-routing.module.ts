import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FormDyeingRequisitionDetailsWdComponent } from '../../../../../main/wd/form-dyeing-requisition-wd/form-dyeing-requisition-details-wd/form-dyeing-requisition-details-wd.component';

export const routes: Routes = [

    {

        path: '', component: FormDyeingRequisitionDetailsWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FormDyeingRequisitionDetailsWdModuleRoutingModule { }
