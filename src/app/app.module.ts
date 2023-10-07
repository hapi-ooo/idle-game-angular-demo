import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ResourcesComponent } from './resources/resources.component';
import { ownedResourcesReducer } from './resources/state/owned-resources.reducer';
import { resourcesReducer } from './resources/state/resources.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ResourcesComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ ownedResources: ownedResourcesReducer, resources: resourcesReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
