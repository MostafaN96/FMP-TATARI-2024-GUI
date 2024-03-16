import { NgModule } from '@angular/core';

// Routing Module
import { AddAddPurchaseOrderWaModuleRoutingModule } from './add-add-purchase-order-wa-module-routing.module';

// Component
import { AddAddPurchaseOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/add-add-purchase-order-wa/add-add-purchase-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddPurchaseOrderWaComponent
  ],
  imports: [
    SharedModule,
    AddAddPurchaseOrderWaModuleRoutingModule
  ]
})
export class AddAddPurchaseOrderWaModuleModule { }
