import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnOrderRequisitionDetailsWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-details-wa/yarn-order-requisition-details-wa.component';

export const routes: Routes = [

    {

        path: '', component: YarnOrderRequisitionDetailsWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnOrderRequisitionDetailsWaModuleRoutingModule { }
