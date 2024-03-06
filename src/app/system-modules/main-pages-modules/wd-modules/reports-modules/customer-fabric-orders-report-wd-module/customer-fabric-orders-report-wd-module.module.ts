import { NgModule } from '@angular/core';

// Routing Module
import { CustomerFabricOrdersReportWdModuleRoutingModule } from './customer-fabric-orders-report-wd-module-routing.module';

// Component
import { CustomerFabricOrdersReportWdComponent } from 'src/app/main/wd/reports/customer-fabric-orders-report-wd/customer-fabric-orders-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    CustomerFabricOrdersReportWdComponent
  ],
  imports: [
    SharedModule,
    CustomerFabricOrdersReportWdModuleRoutingModule
  ]
})
export class CustomerFabricOrdersReportWdModuleModule { }
