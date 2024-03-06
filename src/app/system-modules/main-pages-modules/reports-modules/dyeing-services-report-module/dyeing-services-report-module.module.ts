import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DyeingServicesReportModuleRoutingModule } from './dyeing-services-report-module-routing.module';

// Component
import { DyeingServicesReportComponent } from '../../../../main/reports/dyeing-services-report/dyeing-services-report.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Shared Component
import { DyeingColorsReportComponent } from '../../../../main/reports/dyeing-colors-report/dyeing-colors-report.component';

@NgModule({
  declarations: [
    DyeingServicesReportComponent,

    // Shared Component
    DyeingColorsReportComponent
  ],
  imports: [
    SharedModule,
    DyeingServicesReportModuleRoutingModule
  ]
})
export class DyeingServicesReportModuleModule { }
