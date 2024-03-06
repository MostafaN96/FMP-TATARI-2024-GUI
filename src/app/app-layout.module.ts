import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Main Side
import { MainRoutingPageComponent } from './main/main-routing-page/main-routing-page.component';
import { DashboardLoginComponent } from './main/dashboard-login/dashboard-login.component';


// Client Side


// ERROR PAGE
import { PageNotFoundComponent } from './general-pages/page-not-found/page-not-found.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Shared Module
import { SharedModule } from './shared-modules/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,

        // Shared Module
        SharedModule,
            ],
    exports: [
        // Main Side
        MainRoutingPageComponent,
        DashboardLoginComponent

        // Client Side

    ],
    declarations: [
        // Main Side
        MainRoutingPageComponent,
        DashboardLoginComponent,

        // Client Side

        // ERROR PAGE
        PageNotFoundComponent,
    ]
})
export class AppLayoutModule { }
