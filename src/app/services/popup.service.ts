import { ApplicationRef, EnvironmentInjector, Injectable, createComponent } from "@angular/core";
import { NgElement, WithProperties } from '@angular/elements';
import { PopupComponent } from "../popup/popup.component";

@Injectable()
export class PopupService {
  constructor(private injector: EnvironmentInjector,
              private applicationRef: ApplicationRef) {}

  // Previous dynamic-loading method required infrastructure
  // before adding a popup to the DOM.
  showAsComponent(message: string) {
    // Create element
    const popup = document.createElement('popup-component');

    // Create the component and wire it up with the element
    const popupComponentRef = createComponent(PopupComponent,
      {environmentInjector: this.injector, hostElement: popup});

    // Attach the the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    // Listen to the close event
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    })

    // Set the message
    popupComponentRef.instance.message = message;

    // Add to the DOM
    document.body.appendChild(popup);
  }
  // This used the new custom-element method to add the popup 
  // to the DOM.
  showAsElement(message: string) {
    // Create element
    const popupEl: NgElement & WithProperties<PopupComponent> =
      document.createElement('popup-element') as any;
    
    // Listen to the close event
    popupEl.addEventListener('closed', () =>
      document.body.removeChild(popupEl));
    
    // Set the message
    popupEl.message = message;

    // Add to the DOM
    document.body.appendChild(popupEl);


  }
}