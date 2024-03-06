import { NgModule } from '@angular/core';

// Routing Module
import { InquireFabricAvilabilityBySendDataReportWdModuleRoutingModule } from './inquire-fabric-avilability-by-send-data-report-wd-module-routing.module';

// Component
import { InquireFabricAvilabilityBySendDataReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-by-send-data-report-wd/inquire-fabric-avilability-by-send-data-report-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { InquireFabricAvilabilitySharedReportWdModuleModule } from 'src/app/system-modules/main-pages-modules/wd-modules/reports-modules/inquire-fabric-avilability-shared-report-wd-module/inquire-fabric-avilability-shared-report-wd-module.module';

@NgModule({
  declarations: [
    InquireFabricAvilabilityBySendDataReportWdComponent
  ],
  imports: [
    SharedModule,
    InquireFabricAvilabilityBySendDataReportWdModuleRoutingModule,
    InquireFabricAvilabilitySharedReportWdModuleModule
  ],
  exports: [
    InquireFabricAvilabilitySharedReportWdModuleModule
  ]
})
export class InquireFabricAvilabilityBySendDataReportWdModuleModule { }
