import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddFormDyeingRequisitionByOrderWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/add-form-dyeing-requisition-by-order-wd/add-form-dyeing-requisition-by-order-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddFormDyeingRequisitionByOrderWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddFormDyeingRequisitionByOrderWdModuleRoutingModule { }
