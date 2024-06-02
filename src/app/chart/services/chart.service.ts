import { Injectable } from "@angular/core";
import groupArray from "group-array";
import { EventsService } from "src/app/services/events.service";
import { EventRecordsByDistinctNames } from "src/app/types/event.model";
import { ChartDataRow } from "../types/chart-data-row.model";
import { EventsByDistinctLabelsAndNames } from "../types/events-by-distinct-names-and-labels.model";
import { EventDistinctName as Names } from "../../types/event-distinct-name.enum";

@Injectable()
export class ChartService {
  constructor(private _eventsService: EventsService) {}

  calculateDataFromEvents(
    events: EventRecordsByDistinctNames,
    groupingProp: string,
  ): ChartDataRow[] {
    const eventsDataFrame = this._createEventsDataFrame(events, groupingProp);
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
    groupingProp: string,
  ) {
    /**
     * group events by:
     * - distinct names (e.g. start, interaction)
     * - distinct grouped property (e.g. for platform: ios, android)
     */
    return Object.entries(events).reduce<EventsByDistinctLabelsAndNames>(
      (acc, [key, arr]) => ({
        ...acc,
        [key]: groupArray(arr, groupingProp),
      }),
      {},
    );
  }
}
