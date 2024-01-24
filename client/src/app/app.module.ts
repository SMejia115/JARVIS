import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PrincipalViewComponent } from './components/principal-view/principal-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';



import { FormsModule } from '@angular/forms';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightModule } from 'ngx-highlightjs';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrincipalViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, only if you want the line numbers
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
