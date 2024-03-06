import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSellerModuleRoutingModule } from './add-seller-module-routing.module';

// Component
import { AddSellerComponent } from '../../../../main/seller/add-seller/add-seller.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddSellerComponent
  ],
  imports: [
    SharedModule,
    AddSellerModuleRoutingModule
  ]
})
export class AddSellerModuleModule { }
