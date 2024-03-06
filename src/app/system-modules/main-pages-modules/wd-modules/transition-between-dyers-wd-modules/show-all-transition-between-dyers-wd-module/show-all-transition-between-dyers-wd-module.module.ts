import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransitionBetweenDyersWdModuleRoutingModule } from './show-all-transition-between-dyers-wd-module-routing.module';

// Component
import { ShowAllTransitionBetweenDyersWdComponent } from '../../../../../main/wd/transition-between-dyers-wd/show-all-transition-between-dyers-wd/show-all-transition-between-dyers-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransitionBetweenDyersWdComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransitionBetweenDyersWdModuleRoutingModule
  ]
})
export class ShowAllTransitionBetweenDyersWdModuleModule { }
