import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreIndustryModuleRoutingModule } from './restore-industry-module-routing.module';

// Component
import { RestoreIndustryComponent } from '../../../../main/industry/restore-industry/restore-industry.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreIndustryComponent
  ],
  imports: [
    SharedModule,
    RestoreIndustryModuleRoutingModule
  ]
})
export class RestoreIndustryModuleModule { }
