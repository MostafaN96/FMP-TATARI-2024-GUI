import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Components
import { CurrentStockReportWeComponent } from 'src/app/main/we/reports/current-stock-report-we/current-stock-report-we.component';
import { CurrentStockFormDyeingWdComponent } from 'src/app/main/wd/reports/current-stock-form-dyeing-wd/current-stock-form-dyeing-wd.component';
import { UpdateDyeingServicesWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/update-dyeing-services-wd/update-dyeing-services-wd.component';
import { AddInternalTransportWbComponent } from 'src/app/main/wb/transport-wa-wb-requisition-wb/add-internal-transport-wb/add-internal-transport-wb.component';
import { UpdateCurrentStockReportWeComponent } from 'src/app/main/we/update-current-stock-report-we/update-current-stock-report-we.component';

// Shared Module
import { SharedModule } from '../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    CurrentStockReportWeComponent,
        CurrentStockFormDyeingWdComponent,
        UpdateDyeingServicesWdComponent,
        AddInternalTransportWbComponent,
        UpdateCurrentStockReportWeComponent
],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    // Components
      CurrentStockReportWeComponent,
      CurrentStockFormDyeingWdComponent,
      UpdateDyeingServicesWdComponent,
      AddInternalTransportWbComponent,
      UpdateCurrentStockReportWeComponent
  ]
})
export class SharedComponentsModule { }
