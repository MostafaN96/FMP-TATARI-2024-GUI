import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { HomePageComponent } from 'src/app/main/home-page/home-page.component';

export const routes: Routes = [

    {

        path: '', component: HomePageComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class HomePageModuleRoutingModule { }
