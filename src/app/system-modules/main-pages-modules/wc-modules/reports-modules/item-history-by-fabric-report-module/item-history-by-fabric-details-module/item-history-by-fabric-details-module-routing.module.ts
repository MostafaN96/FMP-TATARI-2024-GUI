import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByFabricDetailsComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric-details/item-history-by-fabric-details.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByFabricDetailsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByFabricDetailsModuleRoutingModule { }
