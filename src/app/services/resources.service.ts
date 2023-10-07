import { Injectable } from "@angular/core";
import { DependentService, ServiceInitStatus } from "./services.model";
import { TickService } from "./tick.service";
import { Observable, of } from "rxjs";
import { ResourceList } from "../resources/resources.data";
import { Store } from "@ngrx/store";
import { ResourcesActions } from "../resources/state/resources.actions";
import { OwnedResource } from "../resources/resources.model";

const RESOURCE_TICK_FREQUENCY = 4;

@Injectable()
export class ResourcesService extends DependentService {
  private resourceTick: number = 0;

  constructor(private tickService: TickService, private store: Store) {
    super();
  }

  Init(): Observable<ServiceInitStatus> {
    this.initialized = true;

    this.tickService.OnTick().subscribe({
      next: _ => {
        this.resourceTick++;
        if (this.resourceTick % RESOURCE_TICK_FREQUENCY === 0) {
          this.resourceTick = 0;
          this.store.dispatch(ResourcesActions.tickOwnedResources());
        }
      },
      error: err => this.logServiceError(err),
    });
    return of(this.getServiceInitStatus());
  }

  getResourceList(): Readonly<OwnedResource[]> {
    return ResourceList;
  }
}