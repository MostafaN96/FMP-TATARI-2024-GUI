import { NgModule } from '@angular/core';

// Routing Module
import { AddDyeingOrderWdModuleRoutingModule } from './add-dyeing-order-wd-module-routing.module';

// Component
import { AddDyeingOrderWdComponent } from 'src/app/main/wd/dyeing-order-wd/add-dyeing-order-wd/add-dyeing-order-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddDyeingOrderWdComponent
  ],
  imports: [
    SharedModule,
    AddDyeingOrderWdModuleRoutingModule,
  ]
})
export class AddDyeingOrderWdModuleModule { }
