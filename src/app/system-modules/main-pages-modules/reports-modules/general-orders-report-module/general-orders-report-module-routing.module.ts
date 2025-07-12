import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { GeneralOrdersReportComponent } from 'src/app/main/reports/general-orders-report/general-orders-report.component';

export const routes: Routes = [

    {

        path: '', component: GeneralOrdersReportComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class GeneralOrdersReportModuleRoutingModule { }
