import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllAnointedServicesModuleRoutingModule } from './show-all-anointed-services-module-routing.module';

// Component
import { ShowAllAnointedServicesComponent } from '../../../../main/anointed-services/show-all-anointed-services/show-all-anointed-services.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateAnointedServicesComponent } from '../../../../main/anointed-services/update-anointed-services/update-anointed-services.component';

@NgModule({
  declarations: [
    ShowAllAnointedServicesComponent,
    UpdateAnointedServicesComponent
  ],
  imports: [
    SharedModule,
    ShowAllAnointedServicesModuleRoutingModule
  ]
})
export class ShowAllAnointedServicesModuleModule { }
