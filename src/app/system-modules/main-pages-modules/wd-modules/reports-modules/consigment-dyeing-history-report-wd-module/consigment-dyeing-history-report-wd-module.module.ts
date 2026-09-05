import { NgModule } from '@angular/core';
import { ConsigmentDyeingHistoryReportWdModuleRoutingModule } from './consigment-dyeing-history-report-wd-module-routing.module';
import { ConsigmentDyeingHistoryReportWdComponent } from 'src/app/main/wd/reports/consigment-dyeing-history-report-wd/consigment-dyeing-history-report-wd.component';
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ConsigmentDyeingHistoryReportWdComponent
  ],
  imports: [
    SharedModule,
    ConsigmentDyeingHistoryReportWdModuleRoutingModule
  ]
})
export class ConsigmentDyeingHistoryReportWdModuleModule { }
