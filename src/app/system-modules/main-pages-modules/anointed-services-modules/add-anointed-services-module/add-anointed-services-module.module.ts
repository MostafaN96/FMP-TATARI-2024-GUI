import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAnointedServicesModuleRoutingModule } from './add-anointed-services-module-routing.module';

// Component
import { AddAnointedServicesComponent } from '../../../../main/anointed-services/add-anointed-services/add-anointed-services.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAnointedServicesComponent
  ],
  imports: [
    SharedModule,
    AddAnointedServicesModuleRoutingModule
  ]
})
export class AddAnointedServicesModuleModule { }
