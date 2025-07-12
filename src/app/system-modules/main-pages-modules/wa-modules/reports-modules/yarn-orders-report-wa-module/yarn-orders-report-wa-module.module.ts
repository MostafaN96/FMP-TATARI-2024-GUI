import { NgModule } from '@angular/core';

import { YarnOrdersReportWaModuleRoutingModule } from './yarn-orders-report-wa-module-routing.module';

// Component
import { YarnOrdersReportWaComponent } from 'src/app/main/wa/reports/yarn-orders-report-wa/yarn-orders-report-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    YarnOrdersReportWaComponent
  ],
  imports: [
    SharedModule,
    YarnOrdersReportWaModuleRoutingModule
  ]
})
export class YarnOrdersReportWaModuleModule { }
