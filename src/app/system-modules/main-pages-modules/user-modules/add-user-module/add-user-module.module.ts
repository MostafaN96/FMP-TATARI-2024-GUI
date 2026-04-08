import { NgModule } from '@angular/core';

import { AddUserModuleRoutingModule } from './add-user-module-routing.module';

// Component
import { AddUserComponent } from 'src/app/main/user/add-user/add-user.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    SharedModule,
    AddUserModuleRoutingModule
  ]
})
export class AddUserModuleModule { }
