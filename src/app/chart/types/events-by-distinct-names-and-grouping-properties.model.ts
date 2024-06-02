import { EventDistinctName } from "src/app/types/event-distinct-name.enum";
import { EventRecord } from "src/app/types/event.model";

export type EventsByDistinctGroupingPropertiesAndNames = {
  [key in EventDistinctName]?: {
    [key: string]: EventRecord[];
  };
};
