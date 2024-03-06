import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SalesReportWeComponent } from 'src/app/main/we/reports/sales-report-we/sales-report-we.component';

export const routes: Routes = [

    {

        path: '', component: SalesReportWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SalesReportWeModuleRoutingModule { }
