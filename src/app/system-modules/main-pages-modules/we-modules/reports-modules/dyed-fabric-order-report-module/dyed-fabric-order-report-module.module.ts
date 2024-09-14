import { NgModule } from '@angular/core';

// Routing Module
import { DyedFabricOrderReportModuleRoutingModule } from './dyed-fabric-order-report-module-routing.module';

// Component
import { DyedFabricOrderReportComponent } from 'src/app/main/we/reports/dyed-fabric-order-report/dyed-fabric-order-report.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    DyedFabricOrderReportComponent
  ],
  imports: [
    SharedModule,
    DyedFabricOrderReportModuleRoutingModule
  ]
})
export class DyedFabricOrderReportModuleModule { }
