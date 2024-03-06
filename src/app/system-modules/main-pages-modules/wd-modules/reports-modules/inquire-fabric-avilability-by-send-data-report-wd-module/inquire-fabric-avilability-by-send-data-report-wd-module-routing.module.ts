import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { InquireFabricAvilabilityBySendDataReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-by-send-data-report-wd/inquire-fabric-avilability-by-send-data-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: InquireFabricAvilabilityBySendDataReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class InquireFabricAvilabilityBySendDataReportWdModuleRoutingModule { }
