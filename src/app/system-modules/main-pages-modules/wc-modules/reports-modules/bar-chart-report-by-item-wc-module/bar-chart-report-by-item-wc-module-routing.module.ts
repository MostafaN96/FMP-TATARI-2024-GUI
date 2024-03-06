import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportByItemWcComponent } from 'src/app/main/wc/reports/bar-chart-report-by-item-wc/bar-chart-report-by-item-wc.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportByItemWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportByItemWcModuleRoutingModule { }
