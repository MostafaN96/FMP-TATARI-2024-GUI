import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByYarnDetailsTotalWaComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn-details-total-wa/item-history-by-yarn-details-total-wa.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByYarnDetailsTotalWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByYarnDetailsTotalWaModuleRoutingModule { }
