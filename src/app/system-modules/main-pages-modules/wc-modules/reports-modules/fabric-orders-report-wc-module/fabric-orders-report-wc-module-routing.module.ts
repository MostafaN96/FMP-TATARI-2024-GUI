import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricOrdersReportWcComponent } from 'src/app/main/wc/reports/fabric-orders-report-wc/fabric-orders-report-wc.component';

export const routes: Routes = [

    {

        path: '', component: FabricOrdersReportWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricOrdersReportWcModuleRoutingModule { }
