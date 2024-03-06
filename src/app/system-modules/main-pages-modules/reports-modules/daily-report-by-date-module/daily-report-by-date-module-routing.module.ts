import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DailyReportByDateComponent } from 'src/app/main/reports/daily-report-by-date/daily-report-by-date.component';

export const routes: Routes = [

    {

        path: '', component: DailyReportByDateComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DailyReportByDateModuleRoutingModule { }
