import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByYarnComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn/item-history-by-yarn.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByYarnModuleRoutingModule { }
