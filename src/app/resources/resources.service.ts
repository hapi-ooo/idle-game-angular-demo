import { Injectable } from "@angular/core";
import { DependentService, ServiceInitStatus } from "../services.model";
import { TickService } from "../tick.service";
import { Observable, of } from "rxjs";
import { ResourceList } from "./resources.data";
import { Store } from "@ngrx/store";
import { OwnedResourcesActions, ResourcesActions } from "./state/resources.actions";

const RESOURCE_TICK_FREQUENCY = 4;

@Injectable({ providedIn: 'root' })
export class ResourcesService extends DependentService {
  private resourceTick: number = 0;

  constructor(private tickService: TickService, private store: Store) {
    super();
  }

  Init(): Observable<ServiceInitStatus> {
    this.initialized = true;

    // Dispatch the full list of Resources for later reference
    let resources = this.getResourceList();
    this.store.dispatch(ResourcesActions.retrievedResourceList({ resources }));

    this.tickService.OnTick().subscribe({
      next: _ => {
        this.resourceTick++;
        if (this.resourceTick % RESOURCE_TICK_FREQUENCY === 0) {
          this.resourceTick = 0;
          this.store.dispatch(OwnedResourcesActions.tickOwnedResources());
        }
      },
      error: err => this.logServiceError(err),
    });
    return of(this.getServiceInitStatus());
  }

  getResourceList(): ReadonlyArray<string> {
    return ResourceList;
  }
}