import { NgModule } from '@angular/core';

import { RestoreColorModuleRoutingModule } from './restore-color-module-routing.module';

// Component
import { RestoreColorComponent } from 'src/app/main/color/restore-color/restore-color.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreColorComponent
  ],
  imports: [
    SharedModule,
    RestoreColorModuleRoutingModule
  ]
})
export class RestoreColorModuleModule { }
