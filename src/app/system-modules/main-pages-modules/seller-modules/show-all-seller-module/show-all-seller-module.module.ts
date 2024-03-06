import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllSellerModuleRoutingModule } from './show-all-seller-module-routing.module';

// Component
import { ShowAllSellerComponent } from '../../../../main/seller/show-all-seller/show-all-seller.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateSellerComponent } from '../../../../main/seller/update-seller/update-seller.component';

@NgModule({
  declarations: [
    ShowAllSellerComponent,
    UpdateSellerComponent
  ],
  imports: [
    SharedModule,
    ShowAllSellerModuleRoutingModule
  ]
})
export class ShowAllSellerModuleModule { }
