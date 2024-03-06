import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllColorCategoryComponent } from '../../../../main/color-category/show-all-color-category/show-all-color-category.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllColorCategoryComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllColorCategoryModuleRoutingModule { }
