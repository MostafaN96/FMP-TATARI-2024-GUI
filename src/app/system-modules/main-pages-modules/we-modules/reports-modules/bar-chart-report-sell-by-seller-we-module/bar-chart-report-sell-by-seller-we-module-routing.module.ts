import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportSellBySellerWeComponent } from 'src/app/main/we/reports/bar-chart-report-sell-by-seller-we/bar-chart-report-sell-by-seller-we.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportSellBySellerWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportSellBySellerWeModuleRoutingModule { }
