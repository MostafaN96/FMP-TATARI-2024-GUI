import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryReportDetailsTotalWdComponent } from 'src/app/main/wd/reports/item-history-report-details-total-wd/item-history-report-details-total-wd.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryReportDetailsTotalWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryReportDetailsTotalWdModuleRoutingModule { }
