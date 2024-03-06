import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreAnointedServicesModuleRoutingModule } from './restore-anointed-services-module-routing.module';

// Component
import { RestoreAnointedServicesComponent } from '../../../../main/anointed-services/restore-anointed-services/restore-anointed-services.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreAnointedServicesComponent
  ],
  imports: [
    SharedModule,
    RestoreAnointedServicesModuleRoutingModule
  ]
})
export class RestoreAnointedServicesModuleModule { }
