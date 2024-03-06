import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ConfirmDirectSellWeComponent } from '../../../../../main/we/sell-requisition-we/confirm-direct-sell-we/confirm-direct-sell-we.component';

export const routes: Routes = [

    {

        path: '', component: ConfirmDirectSellWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ConfirmDirectSellWeModuleRoutingModule { }
