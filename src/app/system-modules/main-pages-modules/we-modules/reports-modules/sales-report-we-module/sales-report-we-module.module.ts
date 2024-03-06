import { NgModule } from '@angular/core';

import { SalesReportWeModuleRoutingModule } from './sales-report-we-module-routing.module';

// Component
import { SalesReportWeComponent } from 'src/app/main/we/reports/sales-report-we/sales-report-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    SalesReportWeComponent
  ],
  imports: [
    SharedModule,
    SalesReportWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class SalesReportWeModuleModule { }
