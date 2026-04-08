import { NgModule } from '@angular/core';

import { ShowAllUserModuleRoutingModule } from './show-all-user-module-routing.module';

// Component
import { ShowAllUserComponent } from 'src/app/main/user/show-all-user/show-all-user.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateUserComponent } from 'src/app/main/user/update-user/update-user.component';

@NgModule({
  declarations: [
    ShowAllUserComponent,
    UpdateUserComponent
  ],
  imports: [
    SharedModule,
    ShowAllUserModuleRoutingModule
  ]
})
export class ShowAllUserModuleModule { }
