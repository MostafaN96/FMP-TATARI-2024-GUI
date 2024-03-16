import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllPurchaseOrderWaModuleRoutingModule } from './show-all-purchase-order-wa-module-routing.module';

// Component
import { ShowAllPurchaseOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/show-all-purchase-order-wa/show-all-purchase-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';


@NgModule({
  declarations: [
    ShowAllPurchaseOrderWaComponent
  ],
  imports: [
    SharedModule,
    ShowAllPurchaseOrderWaModuleRoutingModule
  ]
})
export class ShowAllPurchaseOrderWaModuleModule { }
