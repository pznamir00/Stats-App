import { Injectable } from "@angular/core";
import { EventRecord, EventRecordsByDistinctNames } from "../types/event.model";
import { EventDistinctName } from "../types/event-distinct-name.enum";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  constructor() {}

  countEventsFromArray(events: EventRecord[]) {
    return events.reduce((total, event) => total + event.count, 0);
  }

  groupEventsByDistinctName(
    events: EventRecord[],
  ): EventRecordsByDistinctNames {
    return events.reduce<EventRecordsByDistinctNames>(
      (groups, event) => {
        if (event.name in groups) {
          groups[event.name as EventDistinctName].push(event);
        }
        return groups;
      },
      {
        start: [],
        interaction: [],
        shop_click: [],
      } as EventRecordsByDistinctNames,
    );
  }
}
