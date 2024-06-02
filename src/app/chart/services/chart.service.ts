import { Injectable } from "@angular/core";
import { EventRecord } from "src/app/types/event.model";
import { ChartDataRow } from "../types/chart-data-row.model";
import { EventsByDistinctGroupingPropertiesAndNames } from "../types/events-by-distinct-names-and-grouping-properties.model";
import { EventDistinctName as Names } from "../../types/event-distinct-name.enum";

@Injectable()
export class ChartService {
  constructor() {}

  calculateChartData(
    events: EventRecord[],
    groupingProperty: keyof EventRecord,
  ): ChartDataRow[] {
    const groupedEvents = this._groupEventsByNameAndGroupingProperty(
      events,
      groupingProperty,
    );
    const distinctPropertyValues = Object.keys(groupedEvents.start!);
    return distinctPropertyValues.map((prop) =>
      this._createChartRowForGroupingPropertyValue(prop, groupedEvents),
    );
  }

  private _groupEventsByNameAndGroupingProperty(
    events: EventRecord[],
    property: keyof EventRecord,
  ) {
    /**
     * This method groups events by their names and "property" (e.g. platform).
     * It returns nested object with name groups and "property" groups like
     * that:
     *
     * {
     *    start: {
     *      android: [...],
     *      ios: [...],
     *      unknown: [...]
     *    },
     *    ...
     * }
     */

    const distinctNames = [Names.START, Names.INTERACTION, Names.SHOP_CLICK];

    /**
     * Extracting all considered events (it means, all
     * events with matching name).
     * The rest of events will be ignored.
     */
    events = events.filter((e) => (distinctNames as string[]).includes(e.name));

    /**
     * Extracting all distinct values of provided "property".
     * E.g. for "platform", it extracts ["android", "ios", "unknown"]
     */
    const groupingPropValues = [...new Set(events.map((e) => e[property]))];

    /**
     * It creates empty "property" groups, just for
     * simplifying below reduce method
     */
    const createEmptyPropGroups = () =>
      groupingPropValues.reduce((acc, val) => ({ ...acc, [val]: [] }), {});

    return events.reduce<EventsByDistinctGroupingPropertiesAndNames>(
      (acc, e) => {
        acc[e.name as Names]![e[property]].push(e);
        return acc;
      },
      {
        [Names.START]: createEmptyPropGroups(),
        [Names.INTERACTION]: createEmptyPropGroups(),
        [Names.SHOP_CLICK]: createEmptyPropGroups(),
      },
    );
  }

  private _createChartRowForGroupingPropertyValue(
    value: string,
    groupedEvents: EventsByDistinctGroupingPropertiesAndNames,
  ): ChartDataRow {
    const startEvents = groupedEvents[Names.START]?.[value]!;
    const interactionEvents = groupedEvents[Names.INTERACTION]?.[value]!;
    const shopClickEvents = groupedEvents[Names.SHOP_CLICK]?.[value]!;

    const countAllEvents = (events: EventRecord[]) =>
      events.reduce((total, event) => total + event.count, 0);

    return {
      label: value,
      data: [
        countAllEvents(startEvents),
        countAllEvents(interactionEvents),
        countAllEvents(shopClickEvents),
      ],
    } as ChartDataRow;
  }
}
