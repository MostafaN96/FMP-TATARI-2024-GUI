import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportBySupplierWaComponent } from 'src/app/main/wa/reports/bar-chart-report-by-supplier-wa/bar-chart-report-by-supplier-wa.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportBySupplierWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportBySupplierWaModuleRoutingModule { }
