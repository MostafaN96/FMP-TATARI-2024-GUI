import { NgModule } from '@angular/core';

// Routing Module
import { DailyReportByDateModuleRoutingModule } from './daily-report-by-date-module-routing.module';

// Component
import { DailyReportByDateComponent } from 'src/app/main/reports/daily-report-by-date/daily-report-by-date.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from 'src/app/system-modules/main-pages-modules/shared-reports-component-module/shared-reports-components.module';

@NgModule({
  declarations: [
    DailyReportByDateComponent
  ],
  imports: [
    SharedModule,
    DailyReportByDateModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class DailyReportByDateModuleModule { }
