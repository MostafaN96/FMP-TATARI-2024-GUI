import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllColorComponent } from 'src/app/main/color/show-all-color/show-all-color.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllColorComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllColorModuleRoutingModule { }
