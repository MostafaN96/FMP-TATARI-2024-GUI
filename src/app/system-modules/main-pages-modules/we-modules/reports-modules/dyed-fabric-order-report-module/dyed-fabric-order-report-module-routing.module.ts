import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyedFabricOrderReportComponent } from 'src/app/main/we/reports/dyed-fabric-order-report/dyed-fabric-order-report.component';

export const routes: Routes = [

    {

        path: '', component: DyedFabricOrderReportComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyedFabricOrderReportModuleRoutingModule { }
