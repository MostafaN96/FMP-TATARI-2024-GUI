import { NgModule } from '@angular/core';

import { UpdateUserPermissionsModuleRoutingModule } from './update-user-permissions-module-routing.module';

// Component
import { UpdateUserPermissionsComponent } from 'src/app/main/user-permissions/update-user-permissions/update-user-permissions.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    UpdateUserPermissionsComponent
  ],
  imports: [
    SharedModule,
    UpdateUserPermissionsModuleRoutingModule
  ]
})
export class UpdateUserPermissionsModuleModule { }
