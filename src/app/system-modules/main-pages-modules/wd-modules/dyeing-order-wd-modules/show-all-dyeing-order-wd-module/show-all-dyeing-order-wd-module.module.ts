import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllDyeingOrderWdModuleRoutingModule } from './show-all-dyeing-order-wd-module-routing.module';

// Component
import { ShowAllDyeingOrderWdComponent } from 'src/app/main/wd/dyeing-order-wd/show-all-dyeing-order-wd/show-all-dyeing-order-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllDyeingOrderWdComponent
  ],
  imports: [
    SharedModule,
    ShowAllDyeingOrderWdModuleRoutingModule,
  ]
})
export class ShowAllDyeingOrderWdModuleModule { }
