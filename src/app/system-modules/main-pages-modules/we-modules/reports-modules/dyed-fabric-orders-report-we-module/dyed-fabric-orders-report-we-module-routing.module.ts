import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyedFabricOrdersReportWeComponent } from 'src/app/main/we/reports/dyed-fabric-orders-report-we/dyed-fabric-orders-report-we.component';

export const routes: Routes = [

    {

        path: '', component: DyedFabricOrdersReportWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyedFabricOrdersReportWeModuleRoutingModule { }
