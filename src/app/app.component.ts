import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  template: `
    <calendar></calendar>
    <br />
    <resources></resources>
  `
})
export class AppComponent implements OnInit {
  title = 'idle-demo';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // Initialize services
    this.appService.Init().subscribe(val => {
      if (!val) console.error("Error in service initialization");
    });
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