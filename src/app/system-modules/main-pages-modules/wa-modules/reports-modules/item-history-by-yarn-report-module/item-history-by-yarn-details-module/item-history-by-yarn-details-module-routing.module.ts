import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByYarnDetailsComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn-details/item-history-by-yarn-details.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByYarnDetailsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByYarnDetailsModuleRoutingModule { }
