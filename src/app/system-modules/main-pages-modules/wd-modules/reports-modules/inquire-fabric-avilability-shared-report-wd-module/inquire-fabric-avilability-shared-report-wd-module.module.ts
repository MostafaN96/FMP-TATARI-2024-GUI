import { NgModule } from '@angular/core';

import { InquireFabricAvilabilitySharedReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-shared-report-wd/inquire-fabric-avilability-shared-report-wd.component';
import { InquireFabricAvilabilitySharedDetailsReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-shared-details-report-wd/inquire-fabric-avilability-shared-details-report-wd.component';
import { InquireFabricAvilabilitySharedTotalReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-shared-total-report-wd/inquire-fabric-avilability-shared-total-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    InquireFabricAvilabilitySharedReportWdComponent,
    InquireFabricAvilabilitySharedDetailsReportWdComponent,
    InquireFabricAvilabilitySharedTotalReportWdComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    // Components
    InquireFabricAvilabilitySharedReportWdComponent,
    InquireFabricAvilabilitySharedDetailsReportWdComponent,
    InquireFabricAvilabilitySharedTotalReportWdComponent
  ]
})
export class InquireFabricAvilabilitySharedReportWdModuleModule { }
