import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { OwnedResourcesActions } from './resources/state/resources.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OwnedResource } from './resources/resources.model';
import { selectOwnedResources } from './resources/state/resources.selector';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  template: `
    <calendar></calendar>
    <br />
    <resources [ownedResources]="(ownedResources$ | async)!"></resources>
    <button (click)="addBug()">Catch Bug</button>
    <button (click)="addFruit()">Harvest Fruit</button>
  `
})
export class AppComponent implements OnInit {
  title = 'idle-demo';
  ownedResources$: Observable<ReadonlyArray<OwnedResource>> = this.store.select(selectOwnedResources);

  constructor(private appService: AppService, private store: Store) {
    this.ownedResources$.subscribe(v => console.log(v));
  }

  ngOnInit(): void {
    // Initialize services
    this.appService.Init().subscribe(val => {
      if (!val) console.error("Error in service initialization");
    });
  }

  addBug = () => {
    this.store.dispatch(OwnedResourcesActions.addResource({resource: {
      id: 'Bugs',
      amount: 1,
    }}));
  }

  addFruit = () => {
    this.store.dispatch(OwnedResourcesActions.addResource({resource: {
      id: 'Fruit',
      amount: 0.2,
    }}));
  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}