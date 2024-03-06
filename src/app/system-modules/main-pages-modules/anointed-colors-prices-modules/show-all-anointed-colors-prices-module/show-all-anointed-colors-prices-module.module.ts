import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllAnointedColorsPricesModuleRoutingModule } from './show-all-anointed-colors-prices-module-routing.module';

// Component
import { ShowAllAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/show-all-anointed-colors-prices/show-all-anointed-colors-prices.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/update-anointed-colors-prices/update-anointed-colors-prices.component';

@NgModule({
  declarations: [
    ShowAllAnointedColorsPricesComponent,
    UpdateAnointedColorsPricesComponent
  ],
  imports: [
    SharedModule,
    ShowAllAnointedColorsPricesModuleRoutingModule
  ]
})
export class ShowAllAnointedColorsPricesModuleModule { }
