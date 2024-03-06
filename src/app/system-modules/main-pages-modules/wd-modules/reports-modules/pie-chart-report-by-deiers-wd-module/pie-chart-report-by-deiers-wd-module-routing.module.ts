import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { PieChartReportByDeiersWdComponent } from 'src/app/main/wd/reports/pie-chart-report-by-deiers-wd/pie-chart-report-by-deiers-wd.component';

export const routes: Routes = [

    {

        path: '', component: PieChartReportByDeiersWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PieChartReportByDeiersWdModuleRoutingModule { }
