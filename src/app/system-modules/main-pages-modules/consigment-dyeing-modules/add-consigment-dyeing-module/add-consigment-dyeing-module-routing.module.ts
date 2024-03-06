import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/add-consigment-dyeing/add-consigment-dyeing.component';

export const routes: Routes = [

    {

        path: '', component: AddConsigmentDyeingComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddConsigmentDyeingModuleRoutingModule { }
