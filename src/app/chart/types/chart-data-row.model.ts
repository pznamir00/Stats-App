import { EventDistinctName } from "src/app/types/event-distinct-name.enum";

export interface ChartDataRow {
  data: number[];
  label: EventDistinctName;
}
