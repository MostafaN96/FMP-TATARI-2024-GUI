import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { WdFormDyeingOrderRequisitionDetailsComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/wd-form-dyeing-order-requisition-details/wd-form-dyeing-order-requisition-details.component';

export const routes: Routes = [

    {

        path: '', component: WdFormDyeingOrderRequisitionDetailsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class WdFormDyeingOrderRequisitionDetailsModuleRoutingModule { }
