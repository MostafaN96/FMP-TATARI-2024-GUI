import { NgModule } from '@angular/core';

// Routing Module
import { DyeingOrderDetailsWdModuleRoutingModule } from './dyeing-order-details-wd-module-routing.module';

// Component
import { DyeingOrderDetailsWdComponent } from 'src/app/main/wd/dyeing-order-wd/dyeing-order-details-wd/dyeing-order-details-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateDyeingOrderWdComponent } from 'src/app/main/wd/dyeing-order-wd/update-dyeing-order-wd/update-dyeing-order-wd.component';
import { AddDyeingOrderFormWdComponent } from 'src/app/main/wd/dyeing-order-wd/add-dyeing-order-form-wd/add-dyeing-order-form-wd.component';

@NgModule({
  declarations: [
    DyeingOrderDetailsWdComponent,
    UpdateDyeingOrderWdComponent,
    AddDyeingOrderFormWdComponent
  ],
  imports: [
    SharedModule,
    DyeingOrderDetailsWdModuleRoutingModule,
  ]
})
export class DyeingOrderDetailsWdModuleModule { }
