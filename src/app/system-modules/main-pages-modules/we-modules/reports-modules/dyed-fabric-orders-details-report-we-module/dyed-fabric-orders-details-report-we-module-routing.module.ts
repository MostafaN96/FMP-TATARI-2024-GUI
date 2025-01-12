import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyedFabricOrdersDetailsReportWeComponent } from 'src/app/main/we/reports/dyed-fabric-orders-details-report-we/dyed-fabric-orders-details-report-we.component';

export const routes: Routes = [

    {

        path: '', component: DyedFabricOrdersDetailsReportWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyedFabricOrdersDetailsReportWeModuleRoutingModule { }
