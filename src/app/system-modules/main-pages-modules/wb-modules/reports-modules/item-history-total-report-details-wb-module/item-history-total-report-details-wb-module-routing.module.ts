import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryTotalReportDetailsWbComponent } from 'src/app/main/wb/reports/item-history-report-wb/item-history-total-report-details-wb/item-history-total-report-details-wb.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryTotalReportDetailsWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryTotalReportDetailsWbModuleRoutingModule { }
