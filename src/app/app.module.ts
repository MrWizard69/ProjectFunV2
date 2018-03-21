import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HomeComponent }from './home.component';
import { VirtualJoysticks }from './VirtualJoystick';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VirtualJoysticks
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
