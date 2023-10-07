import { Component, Input } from "@angular/core";
import { OwnedResource } from "./resources.model";

@Component({
  selector: 'resources',
  template: `
    <div *ngFor="let resource of resources">
      <span>{{resource.resource.id + '   '}} {{resource.resource.amount | number: "1.2-2"}}</span>
      <p>{{resource.changePerSecond}}</p>
    </div>
  `
})
export class ResourcesComponent {
  @Input()
  get resources(): ReadonlyArray<OwnedResource> {
    return this._resources;
  }
  set resources(Resources: ReadonlyArray<OwnedResource>) { 
    this._resources = Resources;
  }
  private _resources: ReadonlyArray<OwnedResource> = [];
}