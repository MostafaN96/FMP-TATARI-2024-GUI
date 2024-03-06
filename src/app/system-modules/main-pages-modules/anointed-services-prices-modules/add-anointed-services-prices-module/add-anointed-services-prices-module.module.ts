import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAnointedServicesPricesModuleRoutingModule } from './add-anointed-services-prices-module-routing.module';

// Component
import { AddAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/add-anointed-services-prices/add-anointed-services-prices.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAnointedServicesPricesComponent
  ],
  imports: [
    SharedModule,
    AddAnointedServicesPricesModuleRoutingModule
  ]
})
export class AddAnointedServicesPricesModuleModule { }
