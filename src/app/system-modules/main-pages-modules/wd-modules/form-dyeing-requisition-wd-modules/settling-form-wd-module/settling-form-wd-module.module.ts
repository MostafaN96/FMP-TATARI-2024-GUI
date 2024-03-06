import { NgModule } from '@angular/core';

// Routing Module
import { SettlingFormWdModuleRoutingModule } from './settling-form-wd-module-routing.module';

// Component
import { SettlingFormWdComponent } from '../../../../../main/wd/form-dyeing-requisition-wd/settling-form-wd/settling-form-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    SettlingFormWdComponent
  ],
  imports: [
    SharedModule,
    SettlingFormWdModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class SettlingFormWdModuleModule { }
