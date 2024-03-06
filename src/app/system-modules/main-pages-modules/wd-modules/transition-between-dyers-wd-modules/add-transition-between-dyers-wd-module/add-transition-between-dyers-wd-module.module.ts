import { NgModule } from '@angular/core';

// Routing Module
import { AddTransitionBetweenDyersWdModuleRoutingModule } from './add-transition-between-dyers-wd-module-routing.module';

// Component
import { AddTransitionBetweenDyersWdComponent } from '../../../../../main/wd/transition-between-dyers-wd/add-transition-between-dyers-wd/add-transition-between-dyers-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransitionBetweenDyersWdComponent
  ],
  imports: [
    SharedModule,
    AddTransitionBetweenDyersWdModuleRoutingModule
  ]
})
export class AddTransitionBetweenDyersWdModuleModule { }
