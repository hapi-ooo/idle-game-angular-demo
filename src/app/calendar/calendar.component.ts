import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../services/calendar.service";
import { Observable } from "rxjs";

const SEASON_LENGTH = 100;
const Seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

@Component({
  selector: 'calendar',
  template: `{{GetCurrentSeason() + ' ' + GetCurrentDay()}}`
})
export class CalendarComponent implements OnInit {
  private currentDay: number = 0;
  private currentSeason: number = 0;

  private calendarTick$: Observable<number> = new Observable();

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarTick$ = this.calendarService.OnCalendarTick();
    this.go();
  }

  private go(): void {
    this.calendarTick$.subscribe({
      next: () => {
        this.currentDay += 1;
        if (this.currentDay === SEASON_LENGTH) {
          this.currentSeason = this.currentSeason === 3 ? 0 : this.currentSeason + 1;
          this.currentDay = 0;
        }
      },
      error: err => console.error("Error in Calendar Component Go function: " + err)
    });
  }

  GetCurrentSeason(): string {
    return Seasons[this.currentSeason];
  }

  GetCurrentDay(): number {
    return this.currentDay + 1;
  }
}