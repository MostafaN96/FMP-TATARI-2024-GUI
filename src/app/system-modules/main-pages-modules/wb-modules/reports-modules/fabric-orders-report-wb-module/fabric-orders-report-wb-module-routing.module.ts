import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricOrdersReportWbComponent } from 'src/app/main/wb/reports/fabric-orders-report-wb/fabric-orders-report-wb.component';

export const routes: Routes = [

    {

        path: '', component: FabricOrdersReportWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricOrdersReportWbModuleRoutingModule { }
