import { NgModule } from '@angular/core';

import { ShowAllColorModuleRoutingModule } from './show-all-color-module-routing.module';

// Component
import { ShowAllColorComponent } from 'src/app/main/color/show-all-color/show-all-color.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateColorComponent } from 'src/app/main/color/update-color/update-color.component';

@NgModule({
  declarations: [
    ShowAllColorComponent,
    UpdateColorComponent
  ],
  imports: [
    SharedModule,
    ShowAllColorModuleRoutingModule
  ]
})
export class ShowAllColorModuleModule { }
