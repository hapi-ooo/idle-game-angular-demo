import { Component, Input } from "@angular/core";
import { OwnedResource } from "./resources.model";

@Component({
  selector: 'resources',
  template: `
    <div *ngFor="let resource of ownedResources">
      <span>{{resource.resource.id + '   '}} {{resource.resource.amount | number: "1.2-2"}}</span>
      <p>{{resource.changePerSecond}}</p>
    </div>
  `
})
export class ResourcesComponent {
  @Input()
  get ownedResources(): ReadonlyArray<OwnedResource> { return this._ownedResources; }
  set ownedResources(ownedResources: ReadonlyArray<OwnedResource>)
    { this._ownedResources = ownedResources; }
  private _ownedResources: ReadonlyArray<OwnedResource> = [];
}