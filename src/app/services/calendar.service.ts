import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { TickService } from "./tick.service";
import { DependentService, ServiceInitStatus } from "./services.model";

const CALENDAR_TICK_FREQUENCY = 5;

@Injectable()
export class CalendarService extends DependentService {
  private calendarSub: Subject<number> = new Subject();

  constructor(private tickService: TickService) {
    super();
  }

  Init(): Observable<ServiceInitStatus> {
    this.initialized = true;
    this.tickService.OnTick().subscribe({
      next: val => {
        if (val % CALENDAR_TICK_FREQUENCY === 0) this.calendarSub.next(val);
      },
      error: err => this.logServiceError(err),
    });
    return of(this.getServiceInitStatus());
  }

  OnCalendarTick(): Observable<number> {
    return this.calendarSub.asObservable();
  }
}