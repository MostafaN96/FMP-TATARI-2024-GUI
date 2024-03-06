import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreDeliveryCarModuleRoutingModule } from './restore-delivery-car-module-routing.module';

// Component
import { RestoreDeliveryCarComponent } from '../../../../main/delivery-car/restore-delivery-car/restore-delivery-car.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreDeliveryCarComponent
  ],
  imports: [
    SharedModule,
    RestoreDeliveryCarModuleRoutingModule
  ]
})
export class RestoreDeliveryCarModuleModule { }
