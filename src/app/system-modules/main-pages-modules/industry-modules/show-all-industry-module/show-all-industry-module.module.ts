import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllIndustryModuleRoutingModule } from './show-all-industry-module-routing.module';

// Component
import { ShowAllIndustryComponent } from '../../../../main/industry/show-all-industry/show-all-industry.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateIndustryComponent } from '../../../../main/industry/update-industry/update-industry.component';

@NgModule({
  declarations: [
    ShowAllIndustryComponent,
    UpdateIndustryComponent
  ],
  imports: [
    SharedModule,
    ShowAllIndustryModuleRoutingModule
  ]
})
export class ShowAllIndustryModuleModule { }
