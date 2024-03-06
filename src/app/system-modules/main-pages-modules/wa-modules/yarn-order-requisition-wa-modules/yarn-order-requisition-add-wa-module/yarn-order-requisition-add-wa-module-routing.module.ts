import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnOrderRequisitionAddWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-add-wa/yarn-order-requisition-add-wa.component';

export const routes: Routes = [

    {

        path: '', component: YarnOrderRequisitionAddWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnOrderRequisitionAddWaModuleRoutingModule { }
