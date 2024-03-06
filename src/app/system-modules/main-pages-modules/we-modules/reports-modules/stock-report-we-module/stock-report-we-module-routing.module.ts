import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { StockReportWeComponent } from 'src/app/main/we/reports/stock-report-we/stock-report-we.component';

export const routes: Routes = [

    {

        path: '', component: StockReportWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class StockReportWeModuleRoutingModule { }
