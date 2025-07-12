import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnOrdersReportWaComponent } from 'src/app/main/wa/reports/yarn-orders-report-wa/yarn-orders-report-wa.component';

export const routes: Routes = [

    {

        path: '', component: YarnOrdersReportWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnOrdersReportWaModuleRoutingModule { }
