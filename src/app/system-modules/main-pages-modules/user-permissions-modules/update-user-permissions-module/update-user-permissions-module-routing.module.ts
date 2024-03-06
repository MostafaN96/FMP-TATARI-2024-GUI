import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { UpdateUserPermissionsComponent } from 'src/app/main/user-permissions/update-user-permissions/update-user-permissions.component';

export const routes: Routes = [

    {

        path: '', component: UpdateUserPermissionsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UpdateUserPermissionsModuleRoutingModule { }
