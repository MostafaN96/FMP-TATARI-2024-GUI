import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddFormDyeingRequisitionWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/add-form-dyeing-requisition-wd/add-form-dyeing-requisition-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddFormDyeingRequisitionWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddFormDyeingRequisitionWdModuleRoutingModule { }
