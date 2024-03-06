import { NgModule } from '@angular/core';

import { AddColorModuleRoutingModule } from './add-color-module-routing.module';

// Component
import { AddColorComponent } from 'src/app/main/color/add-color/add-color.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddColorComponent
  ],
  imports: [
    SharedModule,
    AddColorModuleRoutingModule
  ]
})
export class AddColorModuleModule { }
