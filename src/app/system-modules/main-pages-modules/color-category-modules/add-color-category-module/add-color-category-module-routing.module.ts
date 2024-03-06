import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddColorCategoryComponent } from '../../../../main/color-category/add-color-category/add-color-category.component';

export const routes: Routes = [

    {

        path: '', component: AddColorCategoryComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddColorCategoryModuleRoutingModule { }
