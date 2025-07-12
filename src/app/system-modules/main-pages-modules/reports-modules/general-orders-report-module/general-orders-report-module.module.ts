import { NgModule } from '@angular/core';

import { GeneralOrdersReportModuleRoutingModule } from './general-orders-report-module-routing.module';

// Component
import { GeneralOrdersReportComponent } from 'src/app/main/reports/general-orders-report/general-orders-report.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    GeneralOrdersReportComponent,
  ],
  imports: [
    SharedModule,
    GeneralOrdersReportModuleRoutingModule
  ]
})
export class GeneralOrdersReportModuleModule { }
