import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryReportWdComponent } from 'src/app/main/wd/reports/item-history-report-wd/item-history-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryReportWdModuleRoutingModule { }
