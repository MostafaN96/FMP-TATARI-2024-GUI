import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportByItemWeComponent } from 'src/app/main/we/reports/bar-chart-report-by-item-we/bar-chart-report-by-item-we.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportByItemWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportByItemWeModuleRoutingModule { }
