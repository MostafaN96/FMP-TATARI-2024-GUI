import { NgModule } from '@angular/core';

// Routing Module
import { FormDyerItemHistoryReportWdModuleRoutingModule } from './form-dyer-item-history-report-wd-module-routing.module';

// Component
import { FormDyerItemHistoryReportWdComponent } from 'src/app/main/wd/reports/form-dyer-item-history-report-wd/form-dyer-item-history-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FormDyerItemHistoryReportWdComponent
  ],
  imports: [
    SharedModule,
    FormDyerItemHistoryReportWdModuleRoutingModule
  ]
})
export class FormDyerItemHistoryReportWdModuleModule { }
