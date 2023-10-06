import { Injectable } from "@angular/core";
import { Resource } from "./resources.model";
import { Observable, Subject, of } from "rxjs";
import { TickService } from "../tick.service";
import { DependentService, ServiceInitStatus } from "../services.model";

const RESOURCE_TICK_FREQUENCY = 3;

@Injectable({ providedIn: 'root' })
export class ResourcesService extends DependentService {
  private resourceTick: number = 0;
  private resourceSub: Subject<Resource> = new Subject();
  private resource1: Resource = {id: 'bugs', tickIncrement: 2.3};

  constructor(private tickService: TickService) {
    super();
  }

  Init(): Observable<ServiceInitStatus> {
    this.initialized = true;
    this.tickService.OnTick().subscribe({
      next: _ => {
        if (this.resourceTick % RESOURCE_TICK_FREQUENCY === 0) {
          this.resourceTick = 0;
          this.resourceSub.next(this.resource1);
        }
      },
      error: err => this.logServiceError(err),
    });
    return of(this.getServiceInitStatus());
  }

  Flip(): void {
    this.resource1.tickIncrement *= -1;
  }

  OnResourceTick(): Observable<Resource> {
    return this.resourceSub.asObservable();
  }
}