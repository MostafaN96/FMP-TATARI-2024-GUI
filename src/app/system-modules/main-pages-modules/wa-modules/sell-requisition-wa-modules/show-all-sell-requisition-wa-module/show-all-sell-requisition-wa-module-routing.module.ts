import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllSellRequisitionComponent } from 'src/app/main/wa/sell-requisition-wa/show-all-sell-requisition/show-all-sell-requisition.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllSellRequisitionComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllSellRequisitionWaModuleRoutingModule { }
