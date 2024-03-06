import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricOrdersReportWdComponent } from 'src/app/main/wd/reports/fabric-orders-report-wd/fabric-orders-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: FabricOrdersReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricOrdersReportWdModuleRoutingModule { }
