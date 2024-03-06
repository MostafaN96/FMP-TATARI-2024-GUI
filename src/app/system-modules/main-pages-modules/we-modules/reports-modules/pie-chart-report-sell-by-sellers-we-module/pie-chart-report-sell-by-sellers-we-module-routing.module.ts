import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { PieChartReportSellBySellersWeComponent } from 'src/app/main/we/reports/pie-chart-report-sell-by-sellers-we/pie-chart-report-sell-by-sellers-we.component';

export const routes: Routes = [

    {

        path: '', component: PieChartReportSellBySellersWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PieChartReportSellBySellersWeModuleRoutingModule { }
