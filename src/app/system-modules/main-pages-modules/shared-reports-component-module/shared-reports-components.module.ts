import { NgModule } from '@angular/core';

// Components
import { ItemHistoryByYarnsReportWaComponent } from 'src/app/main/wa/reports/item-history-by-yarns-report-wa/item-history-by-yarns-report-wa.component';
import { AllItemHistoryReportWbComponent } from 'src/app/main/wb/reports/all-item-history-report-wb/all-item-history-report-wb.component';
import { ItemHistoryByFabricsReportWcComponent } from 'src/app/main/wc/reports/item-history-by-fabrics-report-wc/item-history-by-fabrics-report-wc.component';
import { AllItemHistoryReportWdComponent } from 'src/app/main/wd/reports/all-item-history-report-wd/all-item-history-report-wd.component';
import { ItemHistoryByDyedFabricsReportWeComponent } from 'src/app/main/we/reports/item-history-by-dyed-fabrics-report-we/item-history-by-dyed-fabrics-report-we.component';

// Shared Module
import { SharedModule } from '../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryByYarnsReportWaComponent,
    AllItemHistoryReportWbComponent,
    ItemHistoryByFabricsReportWcComponent,
    AllItemHistoryReportWdComponent,
    ItemHistoryByDyedFabricsReportWeComponent,
],
  imports: [
    SharedModule
  ],
  exports: [
    // Components
    ItemHistoryByYarnsReportWaComponent,
    AllItemHistoryReportWbComponent,
    ItemHistoryByFabricsReportWcComponent,
    AllItemHistoryReportWdComponent,
    ItemHistoryByDyedFabricsReportWeComponent,
  ]
})
export class SharedComponentsModule { }
