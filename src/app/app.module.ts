import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PopupComponent } from './popup/popup.component';
import { ResourcesComponent } from './resources/resources.component';

import { ResourcesReducer } from './resources/state/resources.reducer';

import { PopupService } from './services/popup.service';
import { AppService } from './services/app.service';
import { CalendarService } from './services/calendar.service';
import { ResourcesService } from './services/resources.service';
import { TickService } from './services/tick.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ResourcesComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ Resources: ResourcesReducer })
  ],
  providers: [
    AppService,
    CalendarService,
    PopupService,
    ResourcesService,
    TickService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
