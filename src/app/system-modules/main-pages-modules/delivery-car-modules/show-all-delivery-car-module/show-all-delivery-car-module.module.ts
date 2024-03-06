import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllDeliveryCarModuleRoutingModule } from './show-all-delivery-car-module-routing.module';

// Component
import { ShowAllDeliveryCarComponent } from '../../../../main/delivery-car/show-all-delivery-car/show-all-delivery-car.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateDeliveryCarComponent } from '../../../../main/delivery-car/update-delivery-car/update-delivery-car.component';

@NgModule({
  declarations: [
    ShowAllDeliveryCarComponent,
    UpdateDeliveryCarComponent
  ],
  imports: [
    SharedModule,
    ShowAllDeliveryCarModuleRoutingModule
  ]
})
export class ShowAllDeliveryCarModuleModule { }
