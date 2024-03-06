import { NgModule } from '@angular/core';

// Routing Module
import { SellerFabricOrdersReportWbModuleRoutingModule } from './seller-fabric-orders-report-wb-module-routing.module';

// Component
import { SellerFabricOrdersReportWbComponent } from 'src/app/main/wb/reports/seller-fabric-orders-report-wb/seller-fabric-orders-report-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    SellerFabricOrdersReportWbComponent
  ],
  imports: [
    SharedModule,
    SellerFabricOrdersReportWbModuleRoutingModule
  ]
})
export class SellerFabricOrdersReportWbModuleModule { }
