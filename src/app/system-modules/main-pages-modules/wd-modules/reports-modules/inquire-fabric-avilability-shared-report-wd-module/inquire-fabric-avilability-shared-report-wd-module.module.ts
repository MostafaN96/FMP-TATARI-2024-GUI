import { NgModule } from '@angular/core';

import { InquireFabricAvilabilitySharedReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-shared-report-wd/inquire-fabric-avilability-shared-report-wd.component';
import { InquireFabricAvilabilitySharedDetailsReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-shared-details-report-wd/inquire-fabric-avilability-shared-details-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    InquireFabricAvilabilitySharedReportWdComponent,
    InquireFabricAvilabilitySharedDetailsReportWdComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    // Components
    InquireFabricAvilabilitySharedReportWdComponent,
    InquireFabricAvilabilitySharedDetailsReportWdComponent
  ]
})
export class InquireFabricAvilabilitySharedReportWdModuleModule { }
