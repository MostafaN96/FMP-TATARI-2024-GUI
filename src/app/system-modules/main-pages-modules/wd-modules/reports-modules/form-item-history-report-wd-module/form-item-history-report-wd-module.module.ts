import { NgModule } from '@angular/core';

// Routing Module
import { FormItemHistoryReportWdModuleRoutingModule } from './form-item-history-report-wd-module-routing.module';

// Component
import { FormItemHistoryReportWdComponent } from 'src/app/main/wd/reports/form-item-history-report-wd/form-item-history-report-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    FormItemHistoryReportWdComponent
  ],
  imports: [
    SharedModule,
    FormItemHistoryReportWdModuleRoutingModule
  ]
})
export class FormItemHistoryReportWdModuleModule { }
