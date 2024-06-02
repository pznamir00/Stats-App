import { EventDistinctName } from "./event-distinct-name.enum";

export interface EventRecord {
  name: string;
  platform: string;
  version: string;
  count: number;
}

export type EventRecordsByDistinctNames = {
  [key in EventDistinctName]: EventRecord[];
};
