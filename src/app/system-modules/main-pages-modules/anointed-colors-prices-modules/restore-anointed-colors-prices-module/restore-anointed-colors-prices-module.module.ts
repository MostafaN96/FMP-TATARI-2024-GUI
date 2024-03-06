import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreAnointedColorsPricesModuleRoutingModule } from './restore-anointed-colors-prices-module-routing.module';

// Component
import { RestoreAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/restore-anointed-colors-prices/restore-anointed-colors-prices.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreAnointedColorsPricesComponent
  ],
  imports: [
    SharedModule,
    RestoreAnointedColorsPricesModuleRoutingModule
  ]
})
export class RestoreAnointedColorsPricesModuleModule { }
