import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreSellerModuleRoutingModule } from './restore-seller-module-routing.module';

// Component
import { RestoreSellerComponent } from '../../../../main/seller/restore-seller/restore-seller.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreSellerComponent
  ],
  imports: [
    SharedModule,
    RestoreSellerModuleRoutingModule
  ]
})
export class RestoreSellerModuleModule { }
