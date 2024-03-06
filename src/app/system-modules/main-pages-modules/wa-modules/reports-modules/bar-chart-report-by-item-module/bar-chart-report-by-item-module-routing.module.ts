import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportByItemWaComponent } from 'src/app/main/wa/reports/bar-chart-report-by-item-wa/bar-chart-report-by-item-wa.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportByItemWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportByItemModuleRoutingModule { }
