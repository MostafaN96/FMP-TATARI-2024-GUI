import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryReportDetailsWdComponent } from 'src/app/main/wd/reports/item-history-report-details-wd/item-history-report-details-wd.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryReportDetailsWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryReportDetailsWdModuleRoutingModule { }
