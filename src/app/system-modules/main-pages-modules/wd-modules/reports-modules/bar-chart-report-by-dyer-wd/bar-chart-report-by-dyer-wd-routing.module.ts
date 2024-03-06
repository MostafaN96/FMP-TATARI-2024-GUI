import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportByDyerWdComponent } from 'src/app/main/wd/reports/bar-chart-report-by-dyer-wd/bar-chart-report-by-dyer-wd.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportByDyerWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportByDyerWdRoutingModule { }
