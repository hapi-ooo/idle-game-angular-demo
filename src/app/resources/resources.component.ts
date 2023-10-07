import { Component, Input } from "@angular/core";
import { Resource } from "./resources.model";

@Component({
  selector: 'resources',
  template: `
    <div *ngFor="let resource of resources">
      <span>{{resource.id + '   '}} {{resource.amount | number: "1.2-2"}}</span>
      <p>{{resource.changePerSecond}}</p>
    </div>
  `
})
export class ResourcesComponent {
  @Input()
  get resources(): ReadonlyArray<Resource> {
    return this._resources;
  }
  set resources(Resources: ReadonlyArray<Resource>) { 
    this._resources = Resources;
  }
  private _resources: ReadonlyArray<Resource> = [];
}