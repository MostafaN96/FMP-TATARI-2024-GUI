import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyeingServicesReportComponent } from '../../../../main/reports/dyeing-services-report/dyeing-services-report.component';

export const routes: Routes = [

    {

        path: '', component: DyeingServicesReportComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyeingServicesReportModuleRoutingModule { }
