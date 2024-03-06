import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { InquireFabricAvilabilityByDyeingOrderReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-by-dyeing-order-report-wd/inquire-fabric-avilability-by-dyeing-order-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: InquireFabricAvilabilityByDyeingOrderReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class InquireFabricAvilabilityByDyeingOrderReportWdModuleRoutingModule { }
