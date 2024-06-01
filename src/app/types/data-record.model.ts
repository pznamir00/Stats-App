import { DataRecordKnownName } from "./data-record-known-name.enum";
import { Platform } from "./platform.enum";

export interface DataRecord {
  name: string;
  platform: Platform;
  version: string;
  count: number;
}

export type DataRecordsByKnownNames = {
  [key in DataRecordKnownName]: DataRecord[];
};
