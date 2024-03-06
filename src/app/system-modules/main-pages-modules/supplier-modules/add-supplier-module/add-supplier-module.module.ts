import { NgModule } from '@angular/core';

import { AddSupplierModuleRoutingModule } from './add-supplier-module-routing.module';

// Component
import { AddSupplierComponent } from '../../../../main/supplier/add-supplier/add-supplier.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddSupplierComponent
  ],
  imports: [
    SharedModule,
    AddSupplierModuleRoutingModule
  ]
})
export class AddSupplierModuleModule { }
