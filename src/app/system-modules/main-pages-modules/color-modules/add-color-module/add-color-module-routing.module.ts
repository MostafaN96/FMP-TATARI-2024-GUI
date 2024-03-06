import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddColorComponent } from 'src/app/main/color/add-color/add-color.component';

export const routes: Routes = [

    {

        path: '', component: AddColorComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddColorModuleRoutingModule { }
