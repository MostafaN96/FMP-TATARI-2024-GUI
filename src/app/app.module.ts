import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

// Routing Module
import { AppLayoutModule } from './app-layout.module';

// Main
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

// UIKIT Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";
import { UniquePipePipe } from './services/custom-pipe/unique-pipe.pipe';
import { CustomLoadingCellRendererComponent } from './general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';


@NgModule({
  declarations: [
    AppComponent,

    // Main
    SidebarComponent,
    UniquePipePipe,
    CustomLoadingCellRendererComponent,

  ],
  imports: [
    RouterModule.forRoot([], {
      scrollPositionRestoration: 'enabled'
    }),

    BrowserModule,

    // Routing Module
    AppLayoutModule,

    // UIKIT Animation
    BrowserAnimationsModule,

    // MAT Menu For navbar
    MatMenuModule,
    MatIconModule,

    NgxSpinnerModule,

  ],
  providers: [
    // Admin Side


    // Client Side

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
