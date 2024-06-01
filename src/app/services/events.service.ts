import { Injectable } from "@angular/core";
import {
  DataRecord,
  DataRecordsByKnownNames,
} from "../types/data-record.model";
import { DataRecordKnownName } from "../types/data-record-known-name.enum";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  constructor() {}

  groupEventsByKnownName(events: DataRecord[]): DataRecordsByKnownNames {
    return events.reduce<DataRecordsByKnownNames>(
      (groups, event) => {
        if (event.name in groups) {
          groups[event.name as DataRecordKnownName].push(event);
        }
        return groups;
      },
      {
        start: [],
        interaction: [],
        shop_click: [],
      } as DataRecordsByKnownNames,
    );
  }
}
