import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddUserComponent } from 'src/app/main/user/add-user/add-user.component';

export const routes: Routes = [

    {

        path: '', component: AddUserComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddUserModuleRoutingModule { }
