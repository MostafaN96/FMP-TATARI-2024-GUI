import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByFabricComponent } from '../../../../../../main/wc/reports/item-history-by-fabric-report/item-history-by-fabric/item-history-by-fabric.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByFabricComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByFabricModuleRoutingModule { }
