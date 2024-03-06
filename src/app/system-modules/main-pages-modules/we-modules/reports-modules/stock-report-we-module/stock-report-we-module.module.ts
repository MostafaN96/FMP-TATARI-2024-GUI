import { NgModule } from '@angular/core';

import { StockReportWeModuleRoutingModule } from './stock-report-we-module-routing.module';

// Component
import { StockReportWeComponent } from 'src/app/main/we/reports/stock-report-we/stock-report-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    StockReportWeComponent
  ],
  imports: [
    SharedModule,
    StockReportWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class StockReportWeModuleModule { }
