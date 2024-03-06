import { NgModule } from '@angular/core';

import { ShowAllSupplierModuleRoutingModule } from './show-all-supplier-module-routing.module';

// Component
import { ShowAllSupplierComponent } from '../../../../main/supplier/show-all-supplier/show-all-supplier.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateSupplierComponent } from '../../../../main/supplier/update-supplier/update-supplier.component';

@NgModule({
  declarations: [
    ShowAllSupplierComponent,
    UpdateSupplierComponent
  ],
  imports: [
    SharedModule,
    ShowAllSupplierModuleRoutingModule
  ]
})
export class ShowAllSupplierModuleModule { }
