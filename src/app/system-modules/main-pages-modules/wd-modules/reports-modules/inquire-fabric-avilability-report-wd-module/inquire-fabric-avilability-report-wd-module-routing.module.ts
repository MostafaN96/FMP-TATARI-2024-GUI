import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { InquireFabricAvilabilityReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-report-wd/inquire-fabric-avilability-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: InquireFabricAvilabilityReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class InquireFabricAvilabilityReportWdModuleRoutingModule { }
