import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddIndustryModuleRoutingModule } from './add-industry-module-routing.module';

// Component
import { AddIndustryComponent } from '../../../../main/industry/add-industry/add-industry.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddIndustryComponent
  ],
  imports: [
    SharedModule,
    AddIndustryModuleRoutingModule
  ]
})
export class AddIndustryModuleModule { }
