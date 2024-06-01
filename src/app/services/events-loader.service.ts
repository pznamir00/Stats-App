import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataRecord } from "../types/data-record.model";

@Injectable({
  providedIn: "root",
})
export class EventsLoaderService {
  constructor(private _http: HttpClient) {}

  loadEvents() {
    return this._http.get<DataRecord[]>("assets/events-cds.json");
  }
}
