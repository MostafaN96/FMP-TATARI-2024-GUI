import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreAnointedServicesPricesModuleRoutingModule } from './restore-anointed-services-prices-module-routing.module';

// Component
import { RestoreAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/restore-anointed-services-prices/restore-anointed-services-prices.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreAnointedServicesPricesComponent
  ],
  imports: [
    SharedModule,
    RestoreAnointedServicesPricesModuleRoutingModule
  ]
})
export class RestoreAnointedServicesPricesModuleModule { }
