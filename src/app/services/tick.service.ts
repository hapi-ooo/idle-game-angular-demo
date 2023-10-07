import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable()
export class TickService {
  private initialized: boolean = false;
  private tickCountSub: BehaviorSubject<number> = new BehaviorSubject(0);
  private tickCount: number = 0;

  Init(): Observable<boolean> {
    setInterval(() => {
      this.tickCountSub.next(this.tickCount);
      this.tickCount === 9 ? this.tickCount = 0 : this.tickCount += 1;
    }, 200);
    this.initialized = true;
    return of(this.initialized);
  }

  OnTick(): Observable<number> {
    return this.tickCountSub.asObservable();
  }
}