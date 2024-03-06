import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllAnointedServicesPricesModuleRoutingModule } from './show-all-anointed-services-prices-module-routing.module';

// Component
import { ShowAllAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/show-all-anointed-services-prices/show-all-anointed-services-prices.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/update-anointed-services-prices/update-anointed-services-prices.component';

@NgModule({
  declarations: [
    ShowAllAnointedServicesPricesComponent,
    UpdateAnointedServicesPricesComponent
  ],
  imports: [
    SharedModule,
    ShowAllAnointedServicesPricesModuleRoutingModule
  ]
})
export class ShowAllAnointedServicesPricesModuleModule { }
