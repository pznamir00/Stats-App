import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EventRecord } from "../types/event.model";

@Injectable({
  providedIn: "root",
})
export class EventsLoaderService {
  constructor(private _http: HttpClient) {}

  loadEvents() {
    return this._http.get<EventRecord[]>("assets/events-cds.json");
  }
}
