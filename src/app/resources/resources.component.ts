import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Resource } from "./resources.model";
import { ResourcesService } from "./resources.service";

@Component({
  selector: 'resources',
  template: `
    {{r1Name + ': '}}{{GetAmount() | number: '1.2-2'}}
    <br />
    <button (click)="Flip()">Reverse Sign</button>
  `
})
export class ResourcesComponent implements OnInit {
  private r1Amount: number = 0;
  r1Name: string = 'Resource';

  private resourcesTick$: Observable<Resource> = new Observable();

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesTick$ = this.resourcesService.OnResourceTick();
    this.resourcesTick$.subscribe({
      next: resource => {
        this.r1Amount += resource.tickIncrement;
      },
      error: err => console.error("Error in Resource Component: " + err)
    });
  }

  Flip(): void {
    this.resourcesService.Flip();
  }

  GetAmount(): number {
    return this.r1Amount;
  }
}