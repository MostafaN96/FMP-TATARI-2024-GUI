import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DailyReportByDateTotalComponent } from 'src/app/main/reports/daily-report-by-date-total/daily-report-by-date-total.component';

export const routes: Routes = [

    {

        path: '', component: DailyReportByDateTotalComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DailyReportByDateTotalModuleRoutingModule { }
