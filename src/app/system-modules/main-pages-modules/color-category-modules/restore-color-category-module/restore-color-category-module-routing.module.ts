import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreColorCategoryComponent } from '../../../../main/color-category/restore-color-category/restore-color-category.component';

export const routes: Routes = [

    {

        path: '', component: RestoreColorCategoryComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreColorCategoryModuleRoutingModule { }
