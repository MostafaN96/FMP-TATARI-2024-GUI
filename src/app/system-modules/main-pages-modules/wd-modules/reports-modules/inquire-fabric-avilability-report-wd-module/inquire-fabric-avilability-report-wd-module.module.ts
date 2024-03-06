import { NgModule } from '@angular/core';

// Routing Module
import { InquireFabricAvilabilityReportWdModuleRoutingModule } from './inquire-fabric-avilability-report-wd-module-routing.module';

// Component
import { InquireFabricAvilabilityReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-report-wd/inquire-fabric-avilability-report-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { InquireFabricAvilabilitySharedReportWdModuleModule } from 'src/app/system-modules/main-pages-modules/wd-modules/reports-modules/inquire-fabric-avilability-shared-report-wd-module/inquire-fabric-avilability-shared-report-wd-module.module';

@NgModule({
  declarations: [
    InquireFabricAvilabilityReportWdComponent
  ],
  imports: [
    SharedModule,
    InquireFabricAvilabilityReportWdModuleRoutingModule,
    InquireFabricAvilabilitySharedReportWdModuleModule
  ],
  exports: [
    InquireFabricAvilabilitySharedReportWdModuleModule
  ]
})
export class InquireFabricAvilabilityReportWdModuleModule { }
