import { Component } from "@angular/core";
import { EventsLoaderService } from "./services/events-loader.service";
import { EventRecord, EventRecordsByDistinctNames } from "./types/event.model";
import { EventsService } from "./services/events.service";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  eventsByDistinctNames$: Observable<EventRecordsByDistinctNames>;
  groupingProperty: keyof EventRecord = "platform";

  constructor(
    private _eventsLoaderService: EventsLoaderService,
    private _eventsService: EventsService,
  ) {
    this.eventsByDistinctNames$ = this._eventsLoaderService
      .loadEvents()
      .pipe(
        map((events) => this._eventsService.groupEventsByDistinctName(events)),
      );
  }

  onGroupingPropertyChanged(value: keyof EventRecord) {
    this.groupingProperty = value;
  }
}
