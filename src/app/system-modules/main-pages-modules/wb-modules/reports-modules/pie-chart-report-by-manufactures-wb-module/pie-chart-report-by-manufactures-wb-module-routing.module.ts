import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { PieChartReportByManufacturesWbComponent } from 'src/app/main/wb/reports/pie-chart-report-by-manufactures-wb/pie-chart-report-by-manufactures-wb.component';

export const routes: Routes = [

    {

        path: '', component: PieChartReportByManufacturesWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PieChartReportByManufacturesWbModuleRoutingModule { }
