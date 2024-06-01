import { Platform } from "./platform.enum";

export interface DataRecord {
  name: string;
  platform: Platform;
  version: string;
  count: number;
}
