import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAnointedColorsPricesModuleRoutingModule } from './add-anointed-colors-prices-module-routing.module';

// Component
import { AddAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/add-anointed-colors-prices/add-anointed-colors-prices.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAnointedColorsPricesComponent
  ],
  imports: [
    SharedModule,
    AddAnointedColorsPricesModuleRoutingModule
  ]
})
export class AddAnointedColorsPricesModuleModule { }
