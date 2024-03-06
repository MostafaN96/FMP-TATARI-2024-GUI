import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByFabricDetailsTotalWcComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric-details-total-wc/item-history-by-fabric-details-total-wc.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByFabricDetailsTotalWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByFabricDetailsTotalWcRoutingModule { }
