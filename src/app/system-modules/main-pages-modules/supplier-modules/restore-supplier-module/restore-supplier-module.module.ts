import { NgModule } from '@angular/core';

import { RestoreSupplierModuleRoutingModule } from './restore-supplier-module-routing.module';

// Component
import { RestoreSupplierComponent } from '../../../../main/supplier/restore-supplier/restore-supplier.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreSupplierComponent
  ],
  imports: [
    SharedModule,
    RestoreSupplierModuleRoutingModule
  ]
})
export class RestoreSupplierModuleModule { }
