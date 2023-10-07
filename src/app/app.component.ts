import { Component, Injector, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { ResourcesActions } from './resources/state/resources.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Resource } from './resources/resources.model';
import { PopupService } from './services/popup.service';
import { createCustomElement } from '@angular/elements';
import { PopupComponent } from './popup/popup.component';
import { selectResources } from './resources/state/resources.selector';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    div {
      margin: 10px;
      height: 2px;
      border-top: solid 2px black;
    }
  `],
  template: `
    <calendar></calendar>
    <br />
    <resources [resources]="(resources$ | async)!"></resources>
    <button (click)="addBug()">Catch Bug</button>
    <button (click)="addFruit()">Harvest Fruit</button>
    <div ></div>
    <input #input value="Message">
    <button type="button"
      (click)="popup.showAsComponent(input.value)">
      Show as Component
    </button>
    <button type="button"
      (click)="popup.showAsElement(input.value)">
      Show as element
    </button>
  `
})
export class AppComponent implements OnInit {
  title = 'idle-demo';
  resources$: Observable<ReadonlyArray<Resource>> = this.store.select(selectResources);

  constructor(private appService: AppService, 
              private injector: Injector,
              private store: Store,
              public popup: PopupService
  ) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});

    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }

  ngOnInit(): void {
    // Initialize services
    this.appService.Init().subscribe(val => {
      if (!val) console.error("Error in service initialization");
    });
  }

  addBug = () => {
    this.store.dispatch(ResourcesActions.addResource({resource: {
      id: 'Bugs',
      amount: 1,
      changePerSecond: 0,
    }}));
  }

  addFruit = () => {
    this.store.dispatch(ResourcesActions.addResource({resource: {
      id: 'Fruit',
      amount: 0.2,
      changePerSecond: 0,
    }}));
    this.resources$.subscribe(v  => console.log(v)).unsubscribe();
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