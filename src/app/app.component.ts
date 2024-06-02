import { Component } from "@angular/core";
import { EventsLoaderService } from "./services/events-loader.service";
import { EventRecord } from "./types/event.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  events$: Observable<EventRecord[]>;
  groupingProperty: keyof EventRecord = "platform";

  constructor(private _eventsLoaderService: EventsLoaderService) {
    this.events$ = this._eventsLoaderService.loadEvents();
  }

  onGroupingPropertyChanged(value: keyof EventRecord) {
    this.groupingProperty = value;
  }
}
