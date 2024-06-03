import { NgModule } from '@angular/core';

import { UpdateExchangeRateModuleRoutingModule } from './update-exchange-rate-module-routing.module';

// Component
import { UpdateExchangeRateComponent } from 'src/app/main/exchange-rate/update-exchange-rate/update-exchange-rate.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    UpdateExchangeRateComponent
  ],
  imports: [
    SharedModule,
    UpdateExchangeRateModuleRoutingModule
  ]
})
export class UpdateExchangeRateModuleModule { }
