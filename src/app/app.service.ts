import { Injectable } from "@angular/core";
import { TickService } from "./tick.service";
import { CalendarService } from "./calendar/calendar.service";
import { Observable, OperatorFunction, of, zip } from "rxjs";
import { ResourcesService } from "./resources/resources.service";
import { ServiceInitStatus } from "./services.model";

@Injectable({ providedIn: 'root' })
export class AppService {

  private initialized: boolean = false;
  private dependentServices: Observable<ServiceInitStatus[]>;

  constructor(private tickService: TickService, private calendarService: CalendarService, private resourceService: ResourcesService) {
    this.dependentServices = zip([this.calendarService.Init(), this.resourceService.Init()]);
  }

  Init(): Observable<boolean> {

    this.tickService.Init().subscribe({
      next: tickIsInit => {
        if (!tickIsInit) throw new Error("Tick Service failed to initialize");
        this.dependentServices.subscribe( initValues => {
          initValues.forEach( initValue => {
            if (!initValue.isInitialized) throw Error(`${initValue.serviceName} Service failed to initialize`);
            console.log(initValue.serviceName);
          })
        })
        this.initialized = true;
      },
      error: err => {
        console.error('Error in App Service Init: ', + err);
        this.initialized = false;
      },
  });
    return of(this.initialized);
  }
}