import { Injectable } from "@angular/core";
import { EventsService } from "src/app/services/events.service";
import {
  EventRecord,
  EventRecordsByDistinctNames,
} from "src/app/types/event.model";
import { ChartDataRow } from "../types/chart-data-row.model";
import { EventsByDistinctGroupingPropertiesAndNames } from "../types/events-by-distinct-names-and-grouping-properties.model";
import { EventDistinctName as Names } from "../../types/event-distinct-name.enum";

@Injectable()
export class ChartService {
  constructor(private _eventsService: EventsService) {}

  calculateChartDataFromEvents(
    events: EventRecordsByDistinctNames,
    groupingProp: keyof EventRecord,
  ): ChartDataRow[] {
    const eventsDataFrame = this._createEventsDataFrame(events, groupingProp);
    this._populateMissingPropertiesForEachEventsGroup(eventsDataFrame);

    const groupedProperties = Object.keys(eventsDataFrame.start!);
    return groupedProperties.map((prop) => {
      const startEvents = eventsDataFrame[Names.START]?.[prop]!;
      const interactionEvents = eventsDataFrame[Names.INTERACTION]?.[prop]!;
      const shopClickEvents = eventsDataFrame[Names.SHOP_CLICK]?.[prop]!;

      return {
        label: prop,
        data: [
          this._eventsService.countEventsFromArray(startEvents),
          this._eventsService.countEventsFromArray(interactionEvents),
          this._eventsService.countEventsFromArray(shopClickEvents),
        ],
      } as ChartDataRow;
    });
  }

  private _createEventsDataFrame(
    events: EventRecordsByDistinctNames,
    groupingProp: keyof EventRecord,
  ) {
    /**
     * group events by:
     * - distinct names (e.g. start, interaction)
     * - distinct grouped property (e.g. for platform: ios, android)
     */
    return Object.entries(
      events,
    ).reduce<EventsByDistinctGroupingPropertiesAndNames>(
      (acc, [key, arr]) => ({
        ...acc,
        [key]: this._groupEventsByKey(arr, groupingProp),
      }),
      {},
    );
  }

  private _populateMissingPropertiesForEachEventsGroup(
    eventsDataFrame: EventsByDistinctGroupingPropertiesAndNames,
  ) {
    const allProps = Object.values(eventsDataFrame).map(Object.keys).flat();
    const distinctProperties = [...new Set(allProps)];

    for (const dfValue of Object.values(eventsDataFrame)) {
      for (const property of distinctProperties) {
        if (!(property in dfValue)) {
          dfValue[property] = [];
        }
      }
    }
  }

  private _groupEventsByKey(events: EventRecord[], key: keyof EventRecord) {
    return events.reduce<{ [key: string]: EventRecord[] }>((groups, event) => {
      if (event[key] in groups) {
        groups[event[key]].push(event);
      } else {
        groups[event[key]] = [event];
      }
      return groups;
    }, {});
  }
}
