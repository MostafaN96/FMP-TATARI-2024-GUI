import { NgModule } from '@angular/core';

// Routing Module
import { InquireFabricAvilabilityByDyeingOrderReportWdModuleRoutingModule } from './inquire-fabric-avilability-by-dyeing-order-report-wd-module-routing.module';

// Component
import { InquireFabricAvilabilityByDyeingOrderReportWdComponent } from 'src/app/main/wd/reports/inquire-fabric-avilability-by-dyeing-order-report-wd/inquire-fabric-avilability-by-dyeing-order-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { InquireFabricAvilabilitySharedReportWdModuleModule } from 'src/app/system-modules/main-pages-modules/wd-modules/reports-modules/inquire-fabric-avilability-shared-report-wd-module/inquire-fabric-avilability-shared-report-wd-module.module';

@NgModule({
  declarations: [
    InquireFabricAvilabilityByDyeingOrderReportWdComponent
  ],
  imports: [
    SharedModule,
    InquireFabricAvilabilityByDyeingOrderReportWdModuleRoutingModule,
    InquireFabricAvilabilitySharedReportWdModuleModule
  ],
  exports: [
    InquireFabricAvilabilitySharedReportWdModuleModule
  ]
})
export class InquireFabricAvilabilityByDyeingOrderReportWdModuleModule { }
