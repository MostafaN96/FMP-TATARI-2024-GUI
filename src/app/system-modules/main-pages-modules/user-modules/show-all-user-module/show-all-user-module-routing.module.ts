import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllUserComponent } from 'src/app/main/user/show-all-user/show-all-user.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllUserComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllUserModuleRoutingModule { }
