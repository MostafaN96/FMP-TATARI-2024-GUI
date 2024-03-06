import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryReportDetailsWbComponent } from '../../../../../main/wb/reports/item-history-report-wb/item-history-report-details-wb/item-history-report-details-wb.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryReportDetailsWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryReportDetailsWbModuleRoutingModule { }
