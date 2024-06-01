import { Component } from "@angular/core";
import { EventsLoaderService } from "./services/events-loader.service";
import { DataRecordsByKnownNames } from "./types/data-record.model";
import { EventsService } from "./services/events.service";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  eventsByTypes$: Observable<DataRecordsByKnownNames>;

  constructor(
    private _eventsLoaderService: EventsLoaderService,
    private _eventsService: EventsService,
  ) {
    this.eventsByTypes$ = this._eventsLoaderService
      .loadEvents()
      .pipe(
        map((events) => this._eventsService.groupEventsByKnownName(events)),
      );
  }
}
