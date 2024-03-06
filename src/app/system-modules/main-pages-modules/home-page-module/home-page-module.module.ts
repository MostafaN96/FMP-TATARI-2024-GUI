import { NgModule } from '@angular/core';

import { HomePageModuleRoutingModule } from './home-page-module-routing.module';

// Component
import { HomePageComponent } from 'src/app/main/home-page/home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    HomePageModuleRoutingModule
  ]
})
export class HomePageModuleModule { }
