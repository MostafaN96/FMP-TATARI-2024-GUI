import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeliveryCarModuleRoutingModule } from './add-delivery-car-module-routing.module';

// Component
import { AddDeliveryCarComponent } from '../../../../main/delivery-car/add-delivery-car/add-delivery-car.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddDeliveryCarComponent
  ],
  imports: [
    SharedModule,
    AddDeliveryCarModuleRoutingModule
  ]
})
export class AddDeliveryCarModuleModule { }
