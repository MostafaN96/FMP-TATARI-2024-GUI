import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnOrderRequisitionShowAllWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-show-all-wa/yarn-order-requisition-show-all-wa.component';

export const routes: Routes = [

    {

        path: '', component: YarnOrderRequisitionShowAllWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnOrderRequisitionShowAllWaModuleRoutingModule { }
