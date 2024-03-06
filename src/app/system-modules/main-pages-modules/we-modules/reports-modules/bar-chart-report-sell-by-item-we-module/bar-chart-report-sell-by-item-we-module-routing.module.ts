import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportSellByItemWeComponent } from 'src/app/main/we/reports/bar-chart-report-sell-by-item-we/bar-chart-report-sell-by-item-we.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportSellByItemWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportSellByItemWeModuleRoutingModule { }
