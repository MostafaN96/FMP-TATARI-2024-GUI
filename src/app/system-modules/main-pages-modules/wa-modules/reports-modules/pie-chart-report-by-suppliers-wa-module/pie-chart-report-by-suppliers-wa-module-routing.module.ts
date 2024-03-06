import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { PieChartReportBySuppliersWaComponent } from 'src/app/main/wa/reports/pie-chart-report-by-suppliers-wa/pie-chart-report-by-suppliers-wa.component';

export const routes: Routes = [

    {

        path: '', component: PieChartReportBySuppliersWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PieChartReportBySuppliersWaModuleRoutingModule { }
