import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryReportWbComponent } from 'src/app/main/wb/reports/item-history-report-wb/item-history-report-wb/item-history-report-wb.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryReportWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryReportWbModuleRoutingModule { }
