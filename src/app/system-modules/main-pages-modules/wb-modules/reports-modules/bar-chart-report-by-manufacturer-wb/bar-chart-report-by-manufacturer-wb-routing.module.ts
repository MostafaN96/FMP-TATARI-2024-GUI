import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { BarChartReportByManufacturerWbComponent } from 'src/app/main/wb/reports/bar-chart-report-by-manufacturer-wb/bar-chart-report-by-manufacturer-wb.component';

export const routes: Routes = [

    {

        path: '', component: BarChartReportByManufacturerWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BarChartReportByManufacturerWbRoutingModule { }
