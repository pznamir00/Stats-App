import { Component } from "@angular/core";
import { EventsLoaderService } from "./services/events-loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "stats-page";

  constructor(private _eventsLoaderService: EventsLoaderService) {}

  ngOnInit(): void {
    this._eventsLoaderService.loadEvents().subscribe((data) => {
      //
    });
  }
}
